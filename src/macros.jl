using Espresso: matchex
using LinearAlgebra: I
using MacroTools: @capture
using InteractiveUtils: subtypes
export @system

# ========================
# @map macro
# ========================

"""
    map(ex, args)

Returns an instance of the map type corresponding to the given expression.

### Input

- `ex`   -- an expression defining the map, in the form of an anonymous function
- `args` -- additional optional arguments

### Output

A map that best matches the given expression.

### Examples

Let us first create a linear map using this macro:

```jldoctest
julia> @map x -> [1 0; 0 0]*x
LinearMap{Int64,Array{Int64,2}}([1 0; 0 0])
```

We can create an affine system as well:

```jldoctest
julia> @map x -> [1 0; 0 0]*x + [2, 0]
AffineMap{Int64,Array{Int64,2},Array{Int64,1}}([1 0; 0 0], [2, 0])
```

Additional arguments can be passed to `@map` using the function-call form, i.e.
separating the arguments by commas, and using parentheses around the macro call.
For example, an identity map of dimension 5 can be defined as:

```jldoctest
julia> @map(x -> x, dim=5)
IdentityMap(5)
```

An identity map can alternatively be created by giving a the size of the identity
matrix as `I(n)`, for example:

```jldoctest
julia> @map x -> I(5)*x
IdentityMap(5)
```
"""
macro map(ex, args)
    quote
        local x = $(ex.args)[1]
        local rhs = $(ex.args)[2].args[2]

        # x -> x, dim=...
        MT = IdentityMap
        local pat = Meta.parse("$x")
        local matched = matchex(pat, rhs)
        matched != nothing && return MT($args)

        throw(ArgumentError("unable to match the given expression to a known map type"))
    end
end

macro map(ex)
    x = (ex.args)[1]
    rhs = (ex.args)[2].args[2]

    # x -> I(n)*x
    # (this rule is more specific than x -> Ax so it should come before it)
    MT = IdentityMap
    pat = Meta.parse("I(_n) * $x")
    matched = matchex(pat, rhs)
    matched != nothing &&
        return Expr(:call, :($MT), esc(:($(matched[:_n]))))

    # x -> Ax
    MT = LinearMap
    pat = Meta.parse("_A * $x")
    matched = matchex(pat, rhs)
    matched != nothing &&
        return Expr(:call, :($MT), esc(:($(matched[:_A]))))

    # x -> Ax + b
    MT = AffineMap
    pat = Meta.parse("_A * $x + _b")
    matched = matchex(pat, rhs)
    matched != nothing &&
        return Expr(:call, :($MT), esc(:($(matched[:_A]))), esc(:($(matched[:_b]))))

    throw(ArgumentError("unable to match the given expression to a known map type"))
end

# ========================
# @system macro
# ========================

const TYPES_CONTINUOUS = subtypes(AbstractContinuousSystem)
const FIELDS_CONTINUOUS = fieldnames.(TYPES_CONTINUOUS)

const TYPES_DISCRETE = subtypes(AbstractDiscreteSystem)
const FIELDS_DISCRETE = fieldnames.(TYPES_DISCRETE)

types_table(::Type{AbstractContinuousSystem}) = TYPES_CONTINUOUS
types_table(::Type{AbstractDiscreteSystem}) = TYPES_DISCRETE

fields_table(::Type{AbstractContinuousSystem}) = FIELDS_CONTINUOUS
fields_table(::Type{AbstractDiscreteSystem}) = FIELDS_DISCRETE

"""
    _corresponding_type(AT::Type{<:AbstractSystem}, fields::Tuple)

Return the system type whose field names match those in `fields`.

### Input

- `AT`     -- abstract system type, which can be either `AbstractContinuousSystem`
              or `AbstractDiscreSystem`
- `fields` -- tuple of field names

### Output

The system type (either discrete or continous, depending on `AT`) whose fields
names correspond to those in `fields`, or an error if the `fields` do not match
any known system type.

### Examples

```jldoctest
julia> using MathematicalSystems: _corresponding_type

julia> _corresponding_type(AbstractContinuousSystem, ((:A),))
LinearContinuousSystem

julia> _corresponding_type(AbstractContinuousSystem, ((:A), (:B), (:X), (:U)))
ConstrainedLinearControlContinuousSystem
```
"""
function _corresponding_type(AT::Type{<:AbstractSystem}, fields::Tuple)
    TYPES = types_table(AT)
    FIELDS = fields_table(AT)
    idx = findall(x -> issetequal(fields, x), FIELDS)
    if isempty(idx)
        throw(ArgumentError("the entry $(fields) does not match a " *
                            "`MathematicalSystems.jl` structure"))
    end
    @assert length(idx) == 1 "found more than one compatible system type"
    return TYPES[idx][1]
end

"""
    _capture_dim(expr)

Return the tuple containing the dimension(s) in `expr`.

### Input

- `expr` -- symbolic expression that can be of any of the following forms:

        - `x` or `(x)` -- state dimension
        - `(x, u)`     -- state and input dimension
        - `(x, u, w)`  -- state, input and noise dimensions

### Output

- The scalar `x` if `expr` specified the state dimension.
- The vector `[x, u]` if `expr` specifies state and input dimension.
- The vector `[x, u, w]` if `expr` specifies state, input and noise dimensions.
"""
function _capture_dim(expr)
    # the order of the `if` clauses is important, as e.g.
    # `@capture(expr, (x_, u_, w_))` is a particular case of `@capture(expr, (x_))`.
    if @capture(expr, (x_, u_, w_))
        dims = [x, u, w]
    elseif @capture(expr, (x_, u_))
        dims = [x, u]
    elseif @capture(expr, (x_))
        dims = x
    else
        throw(ArgumentError("the dimensions in expression $expr could not be parsed; " *
            "see the documentation for valid examples"))
    end
    return dims
end


"""
    is_equation(expr)

Return `true` if the given expression `expr` corresponds to an equation `lhs = rhs`
and `false` otherwise. This function just detects the presence of the symbol `=`.

### Input

- `expr` -- expression

### Output

Returns Bool indicating wether `expr` is an equation or not.
"""
function is_equation(expr)
    return @capture(expr, lhs_ = rhs_)
end

# returns `(equation, AT, state)` if `expr` if the given expression `expr`
# corresponds to a dynamic equation, either of the form `x⁺ = rhs` or `x' = rhs`
#  in the former case `AT = AbstractDiscreteSystem` and in the latter
# `AT = AbstractContinuousSystem`. The equation is `x = rhs` where the superscript
# is stripped from the expression and the state corresponds to `x`,
# otherwise, return `(nothing, nothing, nothing)`
function strip_dynamic_equation(expr)
    expr_str = string(expr)
    stripped_equation = ""
    if occursin("'", expr_str)
        AT = AbstractContinuousSystem
        stripped_equation =  replace(expr_str, "'" => "")
    elseif occursin("⁺", expr_str)
        AT = AbstractDiscreteSystem
        stripped_equation =  replace(expr_str, "⁺" => "")
    end
    stripped_expr = Meta.parse(stripped_equation)
    !@capture(stripped_expr, lhs_ = rhs_) && return (nothing, nothing, nothing)

    if @capture(lhs, (E_*x_)) || @capture(lhs, (x_))
        state = x
        return (stripped_expr, AT, state)
    end
    return (nothing, nothing, nothing)
end

function parse_system(exprs)

    # define default dynamic equation, unknown abstract system type,
    # and empty list of constraints
    dynamic_equation = nothing
    AT = nothing
    constraints = Vector{Expr}()

    # define defaults for state, noise and input symbol and default dimension
    state_var = :x
    input_var = :u
    noise_var = :w
    dimension = nothing

    # main loop to parse the subexpressions in exprs
    for ex in exprs

        if is_equation(ex)  # parse an equation
            (stripped, abstract_system_type, subject) = strip_dynamic_equation(ex)
            if subject != nothing
                dynamic_equation = stripped
                state_var = subject
                AT = abstract_system_type

            elseif @capture(ex, (dim = (f_dims_)) | (dims = (f_dims_)))
                dimension = _capture_dim(f_dims)

            elseif @capture(ex, (input = u_) | (u_ = input))
                input_var = w

            elseif @capture(ex, (noise = w_) | (w_ = noise))
                noise_var = w

            else
                throw(ArgumentError("could not properly parse the equation $ex; " *
                                    "see the documentation for valid examples"))
            end

        elseif @capture(ex, state_ ∈ Set_)  # parse a constraint
            push!(constraints, ex)

        elseif @capture(ex, (input: u_) | (u_: input))  # parse an input symbol
            input_var = u

        elseif @capture(ex, (noise: w_) | (w_: noise))  # parse a noise symbol
            noise_var = w

        elseif @capture(ex, (dim: (f_dims_)) | (dims: (f_dims_)))  # parse a dimension
            dimension = _capture_dim(f_dims)

        else
            throw(ArgumentError("the expression $ex could not be parsed; " *
                                "see the documentation for valid examples"))
        end
    end

    # error handling for the given equations
    dynamic_equation == nothing && error("the dynamic equation was not found")

    # error handling for the given set constraints
    nsets = length(constraints)
    nsets > 3 && error("cannot parse $nsets set constraints")

    return dynamic_equation, AT, constraints,
           state_var, input_var, noise_var, dimension
end

# extract the field and value parameter from the dynamic equation `equation`
# in the form `rhs = [(:A_user, :A), (:B_user, :B), ....]` and
# `lhs = [(:E_user, :E)]` or `lhs = Any[]`
function extract_dyn_equation_parameters(equation, state, input, noise, dim, AT)
    @capture(equation, lhs_ = rhscode_)
    # a multiplication sign * needs to be used
    lhs_params = Any[]
    rhs_params = Any[]
    # if a * is used on the lhs, the rhs is a code-block
    if  @capture(lhs, E_*x_)
        push!(lhs_params, (E, :E))
        rhs = rhscode.args[end]
    else
        rhs = rhscode
    end
    if @capture(rhs, A_ + B__) # If rhs is a sum
        summands = add_asterisk.([A, B...], Ref(state), Ref(input), Ref(noise))
        push!(rhs_params, extract_sum(summands, state, input, noise)...)
    elseif @capture(rhs, f_(a__))  && f != :(*) # If rhs is function call
        # the dimension argument needs to be a iterable
        (dim == nothing) && error("for a blackbox system, the dimension has to be defined")
        dim_vec = [dim...]
        push!(rhs_params, extract_function(rhs, dim_vec)...)
    else # if rhs is a single term (eith A*x, Ax, 2x, x or 0)
        if rhs == state
            if AT == AbstractDiscreteSystem
                push!(rhs_params, (dim, :statedim))
            elseif AT == AbstractContinuousSystem
                push!(rhs_params, (Matrix{Int}(I, dim, dim), :A))
            end
        elseif rhs == :(0) && AT == AbstractContinuousSystem
            push!(rhs_params, (dim, :statedim))
        else
            rhs = add_asterisk(rhs, state, input, noise)
            if @capture(rhs, array_ * var_)
                if state == var
                    value = tryparse(Float64, string(array))
                    if value == nothing
                        push!(rhs_params, (array, :A))
                    else
                        push!(rhs_params, (value*Matrix{Int}(I, dim, dim), :A))
                    end
                else
                    throw(ArgumentError("if there is only one term on the right side, it needs to"*
                            " include the state."))
                end
            end
        end
    end
    return lhs_params, rhs_params
end

"""
    add_asterisk(summand, state::Symbol, input::Symbol, noise::Symbol)

Checks expression `summand` if `state`, `input`or `noise` is contained at its
end. if so, a multiplication expression, e.g. `Expr(:call, :*, :A, :x) is created.
If not, `summand` is returned.

### Input

- `summand` -- expressions
- `state` -- state variable
- `input` -- input variable
- `noise` -- noise variable, if available

### Output

Multiplication expression or symbol.


### Example

```jldoctest
julia> MathematicalSystems.add_asterisk(:(A1*x), :x, :u, :w)
:(A1*x)

julia> MathematicalSystems.add_asterisk(:(c1), :x, :u, :w)
:c1

julia>  MathematicalSystems.add_asterisk(:(Axi), :xi, :u, :w)
:(A*x1)

julia>  MathematicalSystems.add_asterisk(:(Awb), :xi, :u, :wb)
:(A*wb)

julia>  MathematicalSystems.add_asterisk(:(A1u), :x, :u, :w)
:(A1*u)

julia>  MathematicalSystems.add_asterisk(:(A1ub), :x, :u, :w)
:(A1ub)
```
"""
function add_asterisk(summand, state::Symbol, input::Symbol, noise::Symbol)
    if @capture(summand, A_ * x_)
        return summand
    end

    str = string(summand)
    statestr = string(state); lenstate = length(statestr)
    inputstr = string(input); leninput = length(inputstr)
    noisestr = string(noise); lennoise = length(noisestr)

    if lenstate < length(str) && str[(end-lenstate+1):end] == statestr
        return Meta.parse(str[1:end-length(statestr)]*"*$state")

    elseif leninput < length(str) && str[(end-leninput+1):end] == inputstr
        return Meta.parse(str[1:end-length(inputstr)]*"*$input")

    elseif lennoise < length(str) && str[(end-lennoise+1):end] == noisestr
        return Meta.parse(str[1:end-length(noisestr)]*"*$noise")

    else # summand is parsed as a constant term
        return summand
    end

end

"""
    extract_sum(summands, state::Symbol, input::Symbol, noise::Symbol)

Extract the variable name and field name for the every element of `summands`.

If a element of `summands` is a symbol, the symbol is the variable name and the
field name is `:c`. If a element of `summands` is a multiplication expression
`lhs*rhs`, return `lhs` as variable name and `:A` as field name if `lhs==state`,
`:B` as field name if `lhs==input` and `:D` as field name if `lhs==noise`


Given an array of expressions `summands` which consists of one or more elements
which either are mutliplication expression or symbols.

, the corresponding fields of the
affine system and the variable are extracted.
The state variable is parsed as `state`, the noise variable as `noise` and the input
variable as everything else.

### Input

- `summands` -- array of expressions
- `state` -- state variable
- `noise` -- noise variable, if available

### Output

Array of tuples of symbols with variable name and field name.

### Example

```jldoctest
julia>  MathematicalSystems.extract_sum([:(A1*x)], :x, :w)
(:A1, :A)

julia> MathematicalSystems.extract_sum([:(A1*x), :(B1*u1), :c], :x, :w)
[(:A1, :A), (:B1, :B), (:c1, :c)]

julia> MathematicalSystems.extract_sum([:(A1*x7),:( B1*w), :( B2*w8)], :x7, :w8)
[(:A1, :A), (:B1, :B), (:B2, :D)]
```
"""
function extract_sum(summands, state::Symbol, input::Symbol, noise::Symbol)
    params = Any[]
    for summand in summands
        if @capture(summand, array_ * var_)
            if state == var
                push!(params, (array, :A))

            elseif input == var
                push!(params, (array, :B))

            elseif noise == var
                push!(params, (array, :D))

            else
                error("in the dynamic equation, the expression $summand does not" *
                "contain the state $state, the input $input or the noise term $noise")
            end
        elseif @capture(summand, array_)
            push!(params, (array, :c))
        end
    end
    return params
end

function extract_function(rhs, dim::AbstractVector)
    if @capture(rhs, f_(x_))
        @assert length(dim) == 1
        return [(f, :f), (dim[1], :statedim)]
    elseif @capture(rhs, f_(x_,u_))
        @assert length(dim) == 2
        return [(f, :f), (dim[1], :statedim),
                         (dim[2], :inputdim)]
    elseif @capture(rhs, f_(x_,u_,w_))
        @assert length(dim) == 3
        return [(f, :f), (dim[1], :statedim),
                         (dim[2], :inputdim),
                         (dim[3], :noisedim)]
    end
end

function constructor_input(lhs, rhs, set)
    rhs_fields = [tuple[2] for tuple in rhs]
    lhs_fields = [tuple[2] for tuple in lhs]
    set_fields = [tuple[2] for tuple in set]
    (length(unique(set_fields)) != length(set_fields)) &&
        error("There is some ambiguity in the set definition")
    rhs_var_names = [tuple[1] for tuple in rhs]
    lhs_var_names = [tuple[1] for tuple in lhs]
    set_var_names = [tuple[1] for tuple in set]
    field_names = (rhs_fields..., lhs_fields..., set_fields...)
    var_names = (rhs_var_names..., lhs_var_names..., set_var_names...)
    return field_names, var_names
end

function expand_set(expr, state, input, noise) # input => to check set definitions
    if @capture(expr, x_ ∈ Set_)
        if x == state
            return  Set, :X
        elseif x == input
            return  Set, :U
        elseif x == noise
            return  Set, :W
        else
            error("$expr is not a valid set definition, it does not contain"*
                  "the state $state, the input $input or noise term $noise")
        end
    end
    error("The set-entry $(expr) does not have the correct form `x∈X`")
end



"""
    system(expr...)

Returns an instance of the system type corresponding to the given expressions.

### Input

- `expr`   -- expressions separated by commas which define the dynamic equation,
the constraint sets or the dimensionality of the system

### Output

A system that best matches the given expressions.

### Note

The `expr` consist of one or several of the following elements:
- continuous dynamic equation: `x' = Ax `
- discrete dynamic equation: `x⁺ = Ax `
- sets: `x ∈ X`
- dimensionality: `dim: 1` or `dim = 1`
- defining the input variable: `input: u`, `input = u`
- defining the noise variable: `noise: w`, `noise = w`

The dynamic equation is parsed as following. The variable on the left hand side
corresponds to the state variable. The input variable is by default `u` and the
noise variable is by default `w`, if notspecified differently.

If we want to change the default name of the input or noise variable, this can be
done by addingthe term `input: var` where `var` corresponds to the new name of
the input variable.

### Examples

Let us first create a continuous linear system using this macro:

```jldoctest
julia> A = [1. 0; 0 1.];

julia> @system(x' = A*x)
LinearContinuousSystem{Float64,Array{Float64,2}}([1.0 0.0; 0.0 1.0])
```
A discrete system can be defined by using  `⁺`:

```jldoctest
julia> A = [1. 0; 0 1.];

julia> @system(x⁺ = A*x)
LinearContinuousSystem{Float64,Array{Float64,2}}([1.0 0.0; 0.0 1.0])
```

Additionally, a set definition `x ∈ X` can be added to create a constrained system.
For example, a discrete controlled affine system with constrained states and inputs writes
as

```jldoctest
julia> using LazySets;

julia> A = [1. 0; 0 1.];

julia> B = Matrix([1. 0.5]');

julia> c = [1., 1.5];

julia> X = BallInf(zeros(2), 10.);

julia> U = BallInf(zeros(1), 2.);

julia> @system(x⁺ = A*x + B*u + c, x∈X, u∈U);
ConstrainedAffineControlContinuousSystem{Float64,Array{Float64,2},Array{Float64,2},Array{Float64,1},BallInf{Float64},BallInf{Float64}}([1.0 0.0; 0.0 1.0], [1.0; 0.5], [1.0, 1.5], BallInf{Float64}([0.0, 0.0], 10.0), BallInf{Float64}([0.0], 2.0))
```

For the creation of a black-box system, the state, input and noise dimensions have
to be defined separately. For a constrained controlled black-box system, the macro
writes as

```jldoctest
julia> using LazySets;

julia> f(x,u) = x + u;

julia> X = BallInf(zeros(2), 10.);

julia> U = BallInf(zeros(1), 2.);

julia> @system(x⁺ = f(x,u), x∈X, u∈U, dim:(2,2))
ConstrainedBlackBoxControlContinuousSystem{typeof(f),BallInf{Float64},BallInf{Float64}}(f, 2, 2, BallInf{Float64}([0.0, 0.0], 10.0), BallInf{Float64}([0.0], 2.0))
```
"""
macro system(expr...)
    if typeof(expr) == :Expr
        dyn_eq, AT, constr, state, input, noise, dim = parse_system([expr])
    else
        dyn_eq, AT, constr, state, input, noise, dim = parse_system(expr)
    end
    lhs, rhs = extract_dyn_equation_parameters(dyn_eq, state, input, noise, dim, AT)
    set = expand_set.(constr, state, input, noise)
    field_names, var_names = constructor_input(lhs, rhs, set)
    sys_type = _corresponding_type(AT, field_names)
    return  esc(Expr(:call, :($sys_type), :($(var_names...))))
end
