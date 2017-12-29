"""
    LinearDiscreteSystem

Discrete-time linear system of the form
```math
x_{k+1} = A x_k.
```

### Fields

- `A` -- square matrix
"""
struct LinearDiscreteSystem{T, MT <: AbstractMatrix{T}} <: AbstractDiscreteSystem
    A::MT
end
LinearDiscreteSystem{T, MT <: AbstractMatrix{T}}(A::MT) = LinearDiscreteSystem{T, MT}(A)
statedim(s::LinearDiscreteSystem) = Base.LinAlg.checksquare(s.A)
inputdim(s::LinearDiscreteSystem) = 0

"""
    LinearControlDiscreteSystem

Discrete-time linear control system of the form
```math
x_{k+1} = A x_k + B u_k.
```

### Fields

- `A` -- square matrix
- `B` -- matrix
"""
struct LinearControlDiscreteSystem{T, MT <: AbstractMatrix{T}} <: AbstractDiscreteSystem
    A::MT
    B::MT
end
function LinearControlDiscreteSystem{T, MT <: AbstractMatrix{T}}(A::MT, B::MT)
    @assert Base.LinAlg.checksquare(A) == size(B, 1)
    return LinearControlDiscreteSystem{T, MT}(A, B)
end
statedim(s::LinearControlDiscreteSystem) = Base.LinAlg.checksquare(s.A)
inputdim(s::LinearControlDiscreteSystem) = size(s.B, 2)

"""
    ConstrainedLinearDiscreteSystem

Discrete-time linear system with state constraints of the form
```math
x_{k+1} = A x_k, x_k ∈ \\mathcal{X}.
```

### Fields

- `A` -- square matrix
- `X` -- state constraints
"""
struct ConstrainedLinearDiscreteSystem{T, MT <: AbstractMatrix{T}, ST} <: AbstractDiscreteSystem
    A::MT
    X::ST
end
ConstrainedLinearDiscreteSystem{T, MT <: AbstractMatrix{T}, ST}(A::MT, X::ST) = ConstrainedLinearDiscreteSystem{T, MT, ST}(A, X)
statedim(s::ConstrainedLinearDiscreteSystem) = Base.LinAlg.checksquare(s.A)
inputdim(s::ConstrainedLinearDiscreteSystem) = 0

"""
    ConstrainedLinearControlDiscreteSystem

Discrete-time linear control system with state constraints of the form
```math
x_{k+1} = A x_k + B u_k, x_k ∈ \\mathcal{X}, u_k ∈ \\mathcal{U} \\text{ for all } k.
```

### Fields

- `A` -- square matrix
- `B` -- matrix
- `X` -- state constraints
- `U` -- input constraints
"""
struct ConstrainedLinearControlDiscreteSystem{T, MT <: AbstractMatrix{T}, ST, UT} <: AbstractDiscreteSystem
    A::MT
    B::MT
    X::ST
    U::UT
end
function ConstrainedLinearControlDiscreteSystem{T, MT <: AbstractMatrix{T}, ST, UT}(A::MT, B::MT, X::ST, U::UT)
    @assert Base.LinAlg.checksquare(A) == size(B, 1)
    return ConstrainedLinearControlDiscreteSystem{T, MT, ST, UT}(A, B, X, U)
end
statedim(s::ConstrainedLinearControlDiscreteSystem) = Base.LinAlg.checksquare(s.A)
inputdim(s::ConstrainedLinearControlDiscreteSystem) = size(s.B, 2)

"""
    LinearAlgebraicDiscreteSystem

Discrete-time linear algebraic system of the form
```math
E x_{k+1} = A x_k.
```

### Fields

- `A` -- matrix
- `E` -- matrix, same size as `A`
"""
struct LinearAlgebraicDiscreteSystem{T, MT <: AbstractMatrix{T}} <: AbstractDiscreteSystem
    A::MT
    E::MT
end
function LinearAlgebraicDiscreteSystem{T, MT <: AbstractMatrix{T}}(A::MT, E::MT)
    @assert size(A) == size(E)
    return LinearAlgebraicDiscreteSystem{T, MT}(A, E)
end
statedim(s::LinearAlgebraicDiscreteSystem) = size(s.A, 1)
inputdim(s::LinearAlgebraicDiscreteSystem) = 0

"""
    ConstrainedLinearAlgebraicDiscreteSystem

Discrete-time linear system with state constraints of the form
```math
E x_{k+1} = A x_k, x_k ∈ \\mathcal{X}.
```

### Fields

- `A` -- matrix
- `E` -- matrix, same size as `A`
- `X` -- state constraints
"""
struct ConstrainedLinearAlgebraicDiscreteSystem{T, MT <: AbstractMatrix{T}, ST} <: AbstractDiscreteSystem
    A::MT
    E::MT
    X::ST
end
function ConstrainedLinearAlgebraicDiscreteSystem{T, MT <: AbstractMatrix{T}, ST}(A::MT, E::MT, X::ST)
    @assert size(A) == size(E)
    return ConstrainedLinearAlgebraicDiscreteSystem{T, MT, ST}(A, E, X)
end
statedim(s::ConstrainedLinearAlgebraicDiscreteSystem) = size(s.A, 1)
inputdim(s::ConstrainedLinearAlgebraicDiscreteSystem) = 0