var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#MathematicalSystems.jl-1",
    "page": "Home",
    "title": "MathematicalSystems.jl",
    "category": "section",
    "text": "DocTestFilters = [r\"[0-9\\.]+ seconds \\(.*\\)\"]MathematicalSystems is a Julia package for mathematical systems interfaces."
},

{
    "location": "index.html#Features-1",
    "page": "Home",
    "title": "Features",
    "category": "section",
    "text": "Generic and flexible systems definitions, while being fast and type stable.\nTypes for mathematical systems modeling: continuous, discrete, controlled,linear algebraic, etc.Iterator interfaces to handle constant or time-varying inputs."
},

{
    "location": "index.html#Library-Outline-1",
    "page": "Home",
    "title": "Library Outline",
    "category": "section",
    "text": "Pages = [\n    \"lib/types.md\",\n    \"lib/methods.md\"\n]\nDepth = 2"
},

{
    "location": "lib/types.html#",
    "page": "Types",
    "title": "Types",
    "category": "page",
    "text": ""
},

{
    "location": "lib/types.html#Types-1",
    "page": "Types",
    "title": "Types",
    "category": "section",
    "text": "This section describes systems types implemented in MathematicalSystems.jl.Pages = [\"types.md\"]\nDepth = 3CurrentModule = MathematicalSystems\nDocTestSetup = quote\n    using MathematicalSystems\nend"
},

{
    "location": "lib/types.html#MathematicalSystems.AbstractSystem",
    "page": "Types",
    "title": "MathematicalSystems.AbstractSystem",
    "category": "type",
    "text": "AbstractSystem\n\nAbstract supertype for all system types.\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.AbstractContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.AbstractContinuousSystem",
    "category": "type",
    "text": "AbstractContinuousSystem\n\nAbstract supertype for all continuous system types.\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.AbstractDiscreteSystem",
    "page": "Types",
    "title": "MathematicalSystems.AbstractDiscreteSystem",
    "category": "type",
    "text": "AbstractDiscreteSystem\n\nAbstract supertype for all discrete system types.\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#Abstract-Systems-1",
    "page": "Types",
    "title": "Abstract Systems",
    "category": "section",
    "text": "AbstractSystem\nAbstractContinuousSystem\nAbstractDiscreteSystem"
},

{
    "location": "lib/types.html#MathematicalSystems.ContinuousIdentitySystem",
    "page": "Types",
    "title": "MathematicalSystems.ContinuousIdentitySystem",
    "category": "type",
    "text": "ContinuousIdentitySystem <: AbstractContinuousSystem\n\nTrivial identity continuous-time system of the form\n\nx = 0\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedContinuousIdentitySystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedContinuousIdentitySystem",
    "category": "type",
    "text": "ConstrainedContinuousIdentitySystem <: AbstractContinuousSystem\n\nTrivial identity continuous-time system with state constraints of the form\n\nx = 0 x(t)  mathcalX\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.LinearContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.LinearContinuousSystem",
    "category": "type",
    "text": "LinearContinuousSystem\n\nContinuous-time linear system of the form\n\nx = A x\n\nFields\n\nA – square matrix\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.AffineContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.AffineContinuousSystem",
    "category": "type",
    "text": "AffineContinuousSystem\n\nContinuous-time affine system of the form\n\nx = A x + b\n\nFields\n\nA – square matrix\nb – vector\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.LinearControlContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.LinearControlContinuousSystem",
    "category": "type",
    "text": "LinearControlContinuousSystem\n\nContinuous-time linear control system of the form\n\nx = A x + B u\n\nFields\n\nA – square matrix\nB – matrix\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedLinearContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedLinearContinuousSystem",
    "category": "type",
    "text": "ConstrainedLinearContinuousSystem\n\nContinuous-time linear system with state constraints of the form\n\nx = A x x(t)  mathcalX\n\nFields\n\nA – square matrix\nX – state constraints\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedAffineContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedAffineContinuousSystem",
    "category": "type",
    "text": "ConstrainedAffineContinuousSystem\n\nContinuous-time affine system with state constraints of the form\n\nx = A x + b x(t)  mathcalX\n\nFields\n\nA – square matrix\nb – vector\nX – state constraints\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedAffineControlContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedAffineControlContinuousSystem",
    "category": "type",
    "text": "ConstrainedAffineControlContinuousSystem\n\nContinuous-time affine control system with state constraints of the form\n\nx = A x + B u + c x(t)  mathcalX u(t)  mathcalU text for all  t\n\nand c a vector.\n\nFields\n\nA – square matrix\nB – matrix\nc – vector\nX – state constraints\nU – input constraints\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedLinearControlContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedLinearControlContinuousSystem",
    "category": "type",
    "text": "ConstrainedLinearControlContinuousSystem\n\nContinuous-time linear control system with state constraints of the form\n\nx = A x + B u x(t)  mathcalX u(t)  mathcalU text for all  t\n\nFields\n\nA – square matrix\nB – matrix\nX – state constraints\nU – input constraints\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.LinearAlgebraicContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.LinearAlgebraicContinuousSystem",
    "category": "type",
    "text": "LinearAlgebraicContinuousSystem\n\nContinuous-time linear algebraic system of the form\n\nE x = A x\n\nFields\n\nA – matrix\nE – matrix, same size as A\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedLinearAlgebraicContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedLinearAlgebraicContinuousSystem",
    "category": "type",
    "text": "ConstrainedLinearAlgebraicContinuousSystem\n\nContinuous-time linear system with state constraints of the form\n\nE x = A x x(t)  mathcalX\n\nFields\n\nA – matrix\nE – matrix, same size as A\nX – state constraints\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.PolynomialContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.PolynomialContinuousSystem",
    "category": "type",
    "text": "PolynomialContinuousSystem\n\nContinuous-time polynomial system of the form\n\nx = p(x)\n\nFields\n\np        – polynomial\nstatedim – number of state variables\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedPolynomialContinuousSystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedPolynomialContinuousSystem",
    "category": "type",
    "text": "ConstrainedPolynomialContinuousSystem\n\nContinuous-time polynomial system with state constraints,\n\nx = p(x) x(t)  mathcalX\n\nFields\n\np        – polynomial\nX        – constraint set\nstatedim – number of state variables\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#Continuous-Systems-1",
    "page": "Types",
    "title": "Continuous Systems",
    "category": "section",
    "text": "ContinuousIdentitySystem\nConstrainedContinuousIdentitySystem\nLinearContinuousSystem\nAffineContinuousSystem\nLinearControlContinuousSystem\nConstrainedLinearContinuousSystem\nConstrainedAffineContinuousSystem\nConstrainedAffineControlContinuousSystem\nConstrainedLinearControlContinuousSystem\nLinearAlgebraicContinuousSystem\nConstrainedLinearAlgebraicContinuousSystem\nPolynomialContinuousSystem\nConstrainedPolynomialContinuousSystem"
},

{
    "location": "lib/types.html#MathematicalSystems.DiscreteIdentitySystem",
    "page": "Types",
    "title": "MathematicalSystems.DiscreteIdentitySystem",
    "category": "type",
    "text": "DiscreteIdentitySystem <: AbstractDiscreteSystem\n\nTrivial identity discrete-time system of the form\n\nx_k+1 = x_k\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedDiscreteIdentitySystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedDiscreteIdentitySystem",
    "category": "type",
    "text": "ConstrainedDiscreteIdentitySystem <: AbstractDiscreteSystem\n\nTrivial identity discrete-time system with state constraints of the form\n\nx_k+1 = x_k x_k  mathcalX\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.LinearDiscreteSystem",
    "page": "Types",
    "title": "MathematicalSystems.LinearDiscreteSystem",
    "category": "type",
    "text": "LinearDiscreteSystem\n\nDiscrete-time linear system of the form\n\nx_k+1 = A x_k\n\nFields\n\nA – square matrix\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.LinearControlDiscreteSystem",
    "page": "Types",
    "title": "MathematicalSystems.LinearControlDiscreteSystem",
    "category": "type",
    "text": "LinearControlDiscreteSystem\n\nDiscrete-time linear control system of the form\n\nx_k+1 = A x_k + B u_k\n\nFields\n\nA – square matrix\nB – matrix\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedLinearDiscreteSystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedLinearDiscreteSystem",
    "category": "type",
    "text": "ConstrainedLinearDiscreteSystem\n\nDiscrete-time linear system with state constraints of the form\n\nx_k+1 = A x_k x_k  mathcalX\n\nFields\n\nA – square matrix\nX – state constraints\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedLinearControlDiscreteSystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedLinearControlDiscreteSystem",
    "category": "type",
    "text": "ConstrainedLinearControlDiscreteSystem\n\nDiscrete-time linear control system with state constraints of the form\n\nx_k+1 = A x_k + B u_k x_k  mathcalX u_k  mathcalU text for all  k\n\nFields\n\nA – square matrix\nB – matrix\nX – state constraints\nU – input constraints\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.LinearAlgebraicDiscreteSystem",
    "page": "Types",
    "title": "MathematicalSystems.LinearAlgebraicDiscreteSystem",
    "category": "type",
    "text": "LinearAlgebraicDiscreteSystem\n\nDiscrete-time linear algebraic system of the form\n\nE x_k+1 = A x_k\n\nFields\n\nA – matrix\nE – matrix, same size as A\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedLinearAlgebraicDiscreteSystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedLinearAlgebraicDiscreteSystem",
    "category": "type",
    "text": "ConstrainedLinearAlgebraicDiscreteSystem\n\nDiscrete-time linear system with state constraints of the form\n\nE x_k+1 = A x_k x_k  mathcalX\n\nFields\n\nA – matrix\nE – matrix, same size as A\nX – state constraints\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.PolynomialDiscreteSystem",
    "page": "Types",
    "title": "MathematicalSystems.PolynomialDiscreteSystem",
    "category": "type",
    "text": "PolynomialDiscreteSystem\n\nDiscrete-time polynomial system of the form\n\nx_k+1 = p(x_k) x_k  mathcalX\n\nFields\n\np        – polynomial\nstatedim – number of state variables\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedPolynomialDiscreteSystem",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedPolynomialDiscreteSystem",
    "category": "type",
    "text": "ConstrainedPolynomialDiscreteSystem\n\nDiscrete-time polynomial system with state constraints,\n\nx_k+1 = p(x_k) x_k  mathcalX\n\nFields\n\np        – polynomial\nX        – constraint set\nstatedim – number of state variables\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#Discrete-Systems-1",
    "page": "Types",
    "title": "Discrete Systems",
    "category": "section",
    "text": "DiscreteIdentitySystem\nConstrainedDiscreteIdentitySystem\nLinearDiscreteSystem\nLinearControlDiscreteSystem\nConstrainedLinearDiscreteSystem\nConstrainedLinearControlDiscreteSystem\nLinearAlgebraicDiscreteSystem\nConstrainedLinearAlgebraicDiscreteSystem\nPolynomialDiscreteSystem\nConstrainedPolynomialDiscreteSystem"
},

{
    "location": "lib/types.html#MathematicalSystems.IdentityMultiple",
    "page": "Types",
    "title": "MathematicalSystems.IdentityMultiple",
    "category": "type",
    "text": "IdentityMultiple{T} < AbstractMatrix{T} where T\n\nA scalar multiple of the identity matrix of given order and numeric type.\n\nFields\n\nM – uniform scaling operator of type T\nn – size of the identity matrix\n\nNotes\n\nThis is a wrapper type around Julia\'s lazy multiple of the identity operator, UniformScaling, such that IdentityMultiple can be used where abstract matrix is needed for dispatch. The difference between UniformScaling and a IdentityMultiple is that while the size of the former is generic, the size of the latter is fixed.\n\nExamples\n\njulia> import MathematicalSystems.IdentityMultiple\n\njulia> I2 = IdentityMultiple(1.0*I, 2)\nScalar multiple of the identity matrix of order 2:\n   UniformScaling{Float64}\n1.0*I\n\njulia> I2 + I2\nScalar multiple of the identity matrix of order 2:\n   UniformScaling{Float64}\n2.0*I\n\njulia> 10.0 * I2\nScalar multiple of the identity matrix of order 2:\n   UniformScaling{Float64}\n10.0*I\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#Identity-operator-1",
    "page": "Types",
    "title": "Identity operator",
    "category": "section",
    "text": "IdentityMultiple"
},

{
    "location": "lib/types.html#MathematicalSystems.InitialValueProblem",
    "page": "Types",
    "title": "MathematicalSystems.InitialValueProblem",
    "category": "type",
    "text": "InitialValueProblem\n\nParametric composite type for initial value problems. It is parameterized in the system\'s type.\n\nFields\n\ns  – system\nx0 – initial state\n\nExamples\n\nThe linear system x = -x with initial condition x_0 = -12 12:\n\njulia> p = InitialValueProblem(LinearContinuousSystem([-1.0 0.0; 0.0 -1.0]), [-1/2, 1/2]);\n\njulia> p.x0\n2-element Array{Float64,1}:\n -0.5\n  0.5\n\njulia> statedim(p)\n2\n\njulia> inputdim(p)\n0\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.IVP",
    "page": "Types",
    "title": "MathematicalSystems.IVP",
    "category": "type",
    "text": "IVP\n\nIVP is an alias for InitialValueProblem.\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#Initial-Value-Problems-1",
    "page": "Types",
    "title": "Initial Value Problems",
    "category": "section",
    "text": "InitialValueProblem\nIVP"
},

{
    "location": "lib/types.html#MathematicalSystems.AbstractInput",
    "page": "Types",
    "title": "MathematicalSystems.AbstractInput",
    "category": "type",
    "text": "AbstractInput\n\nAbstract supertype for all input types.\n\nNotes\n\nThe input types defined here implement an iterator interface, such that other methods can build upon the behavior of inputs which are either constant or varying.\n\nIteration is supported with an index number called iterator state. The iteration function Base.iterate takes and returns a tuple (input, state), where input represents the value of the input, and state is an index which counts the number of times this iterator was called.\n\nA convenience function nextinput(input, n) is also provided and it returns the first n elements of input.\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstantInput",
    "page": "Types",
    "title": "MathematicalSystems.ConstantInput",
    "category": "type",
    "text": "ConstantInput{UT} <: AbstractInput\n\nType representing an input that remains constant in time.\n\nFields\n\nU – input set\n\nExamples\n\nThe constant input holds a single element and its length is infinite. To access the field U, you can use Base\'s iterate given a state, or the method  nextinput given the number of desired input elements:\n\njulia> c = ConstantInput(-1//2)\nConstantInput{Rational{Int64}}(-1//2)\n\njulia> iterate(c, 1)\n(-1//2, nothing)\n\njulia> iterate(c, 2)\n(-1//2, nothing)\n\njulia> collect(nextinput(c, 4))\n4-element Array{Rational{Int64},1}:\n -1//2\n -1//2\n -1//2\n -1//2\n\nThe elements of this input are rational numbers:\n\njulia> eltype(c)\nRational{Int64}\n\nTo transform a constant input, you can use map as in:\n\njulia> map(x->2*x, c)\nConstantInput{Rational{Int64}}(-1//1)\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.VaryingInput",
    "page": "Types",
    "title": "MathematicalSystems.VaryingInput",
    "category": "type",
    "text": "VaryingInput{UT} <: AbstractInput\n\nType representing an input that may vary with time.\n\nFields\n\nU – vector of input sets\n\nExamples\n\nThe varying input holds a vector and its length equals the number of elements in the vector. Consider an input given by a vector of rational numbers:\n\njulia> v = VaryingInput([-1//2, 1//2])\nVaryingInput{Rational{Int64}}(Rational{Int64}[-1//2, 1//2])\n\njulia> length(v)\n2\n\njulia> eltype(v)\nRational{Int64}\n\nBase\'s iterate method receives the input and an integer state and returns the input element and the next iteration state:\n\njulia> iterate(v, 1)\n(-1//2, 2)\n\njulia> iterate(v, 2)\n(1//2, 3)\n\nThe method nextinput receives a varying input and an integer n and returns an iterator over the first n elements of this input (where n=1 by default):\n\njulia> typeof(nextinput(v))\nBase.Iterators.Take{VaryingInput{Rational{Int64}}}\n\njulia> collect(nextinput(v, 1))\n1-element Array{Rational{Int64},1}:\n -1//2\n\njulia> collect(nextinput(v, 2))\n2-element Array{Rational{Int64},1}:\n -1//2\n  1//2\n\nYou can collect the inputs in an array, or equivalently use list comprehension, (or use a for loop):\n\njulia> collect(v)\n2-element Array{Rational{Int64},1}:\n -1//2\n  1//2\n\njulia> [2*vi for vi in v]\n2-element Array{Rational{Int64},1}:\n -1//1\n  1//1\n\nSince this input type is finite, querying more elements than its length returns the full vector:\n\njulia> collect(nextinput(v, 4))\n2-element Array{Rational{Int64},1}:\n -1//2\n  1//2\n\nTo transform a varying input, you can use map as in:\n\njulia> map(x->2*x, v)\nVaryingInput{Rational{Int64}}(Rational{Int64}[-1//1, 1//1])\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#Input-Types-1",
    "page": "Types",
    "title": "Input Types",
    "category": "section",
    "text": "AbstractInput\nConstantInput\nVaryingInput"
},

{
    "location": "lib/types.html#MathematicalSystems.AbstractMap",
    "page": "Types",
    "title": "MathematicalSystems.AbstractMap",
    "category": "type",
    "text": "AbstractMap\n\nAbstract supertype for all map types.\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.LinearMap",
    "page": "Types",
    "title": "MathematicalSystems.LinearMap",
    "category": "type",
    "text": "LinearMap\n\nA linear map\n\nx  Ax\n\nFields\n\nA – matrix\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.AffineMap",
    "page": "Types",
    "title": "MathematicalSystems.AffineMap",
    "category": "type",
    "text": "AffineMap\n\nAn affine map\n\nx  Ax + b\n\nFields\n\nA – matrix\nb – vector\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.LinearControlMap",
    "page": "Types",
    "title": "MathematicalSystems.LinearControlMap",
    "category": "type",
    "text": "LinearControlMap\n\nA linear control map\n\nx  Ax + Bu\n\nFields\n\nA – matrix\nB – matrix\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedLinearControlMap",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedLinearControlMap",
    "category": "type",
    "text": "ConstrainedLinearControlMap\n\nA linear control map with input constraints,\n\nx  Ax + Bu u  mathcalU\n\nFields\n\nA – matrix\nB – matrix\nU – input constraints\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.AffineControlMap",
    "page": "Types",
    "title": "MathematicalSystems.AffineControlMap",
    "category": "type",
    "text": "AffineControlMap\n\nAn affine control map\n\nx  Ax + Bu + c\n\nFields\n\nA – matrix\nB – matrix\nc – vector\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.ConstrainedAffineControlMap",
    "page": "Types",
    "title": "MathematicalSystems.ConstrainedAffineControlMap",
    "category": "type",
    "text": "ConstrainedAffineControlMap\n\nAn affine control map with input constraints,\n\nx  Ax + Bu + c u  mathcalU\n\nFields\n\nA – matrix\nB – matrix\nc – vector\nU – input constraints\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#Maps-1",
    "page": "Types",
    "title": "Maps",
    "category": "section",
    "text": "AbstractMap\nLinearMap\nAffineMap\nLinearControlMap\nConstrainedLinearControlMap\nAffineControlMap\nConstrainedAffineControlMap"
},

{
    "location": "lib/types.html#MathematicalSystems.SystemWithOutput",
    "page": "Types",
    "title": "MathematicalSystems.SystemWithOutput",
    "category": "type",
    "text": "SystemWithOutput{ST<:AbstractSystem, MT<:AbstractMap}\n\nParametric composite type for systems with outputs. It is parameterized in the system\'s type (ST) and in the map\'s type (MT).\n\nFields\n\ns         – system of type ST\noutputmap – output map of type MT\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.LinearTimeInvariantSystem",
    "page": "Types",
    "title": "MathematicalSystems.LinearTimeInvariantSystem",
    "category": "function",
    "text": "LinearTimeInvariantSystem(A, B, C, D)\n\nA linear time-invariant system with of the form\n\nx = Ax + Bu\ny = Cx + Du\n\nInput\n\nA – matrix\nB – matrix\nC – matrix\nD – matrix\n\nOutput\n\nA system with output such that the system is a linear control continuous system and the output map is a linear control map.\n\n\n\n\n\nLinearTimeInvariantSystem(A, B, C, D, X, U)\n\nA linear time-invariant system with state and input constraints of the form\n\nx = Ax + Bu\ny = Cx + Du\n\nwhere x(t)  X and u(t)  U for all t.\n\nInput\n\nA – matrix\nB – matrix\nC – matrix\nD – matrix\nX – state constraints\nU – input constraints\n\nOutput\n\nA system with output such that the system is a constrained linear control continuous system and the output map is a constrained linear control map.\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#MathematicalSystems.LTISystem",
    "page": "Types",
    "title": "MathematicalSystems.LTISystem",
    "category": "function",
    "text": "LTISystem\n\nLTISystem is an alias for LinearTimeInvariantSystem.\n\n\n\n\n\n"
},

{
    "location": "lib/types.html#Systems-with-output-1",
    "page": "Types",
    "title": "Systems with output",
    "category": "section",
    "text": "SystemWithOutput\nLinearTimeInvariantSystem\nLTISystem"
},

{
    "location": "lib/methods.html#",
    "page": "Methods",
    "title": "Methods",
    "category": "page",
    "text": ""
},

{
    "location": "lib/methods.html#Methods-1",
    "page": "Methods",
    "title": "Methods",
    "category": "section",
    "text": "This section describes systems methods implemented in MathematicalSystems.jl.Pages = [\"methods.md\"]\nDepth = 3CurrentModule = MathematicalSystems\nDocTestSetup = quote\n    using MathematicalSystems\nend"
},

{
    "location": "lib/methods.html#MathematicalSystems.statedim",
    "page": "Methods",
    "title": "MathematicalSystems.statedim",
    "category": "function",
    "text": "statedim(s::AbstractSystem)\n\nReturns the dimension of the state space of system s.\n\n\n\n\n\n"
},

{
    "location": "lib/methods.html#MathematicalSystems.stateset",
    "page": "Methods",
    "title": "MathematicalSystems.stateset",
    "category": "function",
    "text": "stateset(s::AbstractSystem)\n\nReturns the set of allowed states of system s.\n\n\n\n\n\n"
},

{
    "location": "lib/methods.html#States-1",
    "page": "Methods",
    "title": "States",
    "category": "section",
    "text": "statedim\nstateset"
},

{
    "location": "lib/methods.html#MathematicalSystems.inputdim",
    "page": "Methods",
    "title": "MathematicalSystems.inputdim",
    "category": "function",
    "text": "inputdim(s::AbstractSystem)\n\nReturns the dimension of the input space of system s.\n\n\n\n\n\n"
},

{
    "location": "lib/methods.html#MathematicalSystems.inputset",
    "page": "Methods",
    "title": "MathematicalSystems.inputset",
    "category": "function",
    "text": "inputset(s::AbstractSystem)\n\nReturns the set of allowed inputs of system s.\n\n\n\n\n\n"
},

{
    "location": "lib/methods.html#MathematicalSystems.nextinput",
    "page": "Methods",
    "title": "MathematicalSystems.nextinput",
    "category": "function",
    "text": "nextinput(input::ConstantInput, n::Int=1)\n\nReturns the first n elements of this input.\n\nInput\n\ninput – a constant input\nn     – (optional, default: 1) the number of desired elements\n\nOutput\n\nA repeated iterator that generates n equal samples of this input.\n\n\n\n\n\nnextinput(input::VaryingInput, n::Int=1)\n\nReturns the first n elements of this input.\n\nInput\n\ninput – varying input\nn     – (optional, default: 1) number of desired elements\n\nOutput\n\nAn iterator of type Base.Iterators.Take that represents at most the first n elements of this input.\n\n\n\n\n\n"
},

{
    "location": "lib/methods.html#Inputs-1",
    "page": "Methods",
    "title": "Inputs",
    "category": "section",
    "text": "inputdim\ninputset\nnextinput"
},

{
    "location": "lib/methods.html#MathematicalSystems.outputdim",
    "page": "Methods",
    "title": "MathematicalSystems.outputdim",
    "category": "function",
    "text": "outputdim(m::AbstractMap)\n\nReturns the dimension of the output space of the map m.\n\n\n\n\n\n"
},

{
    "location": "lib/methods.html#MathematicalSystems.outputmap",
    "page": "Methods",
    "title": "MathematicalSystems.outputmap",
    "category": "function",
    "text": "outputmap(s::SystemWithOutput)\n\nReturns the output map of a system with output.\n\n\n\n\n\n"
},

{
    "location": "lib/methods.html#Output-1",
    "page": "Methods",
    "title": "Output",
    "category": "section",
    "text": "outputdim\noutputmap"
},

{
    "location": "about.html#",
    "page": "About",
    "title": "About",
    "category": "page",
    "text": ""
},

{
    "location": "about.html#About-1",
    "page": "About",
    "title": "About",
    "category": "section",
    "text": "This page contains some general information about this project, and recommendations about contributing.Pages = [\"about.md\"]"
},

{
    "location": "about.html#Contributing-1",
    "page": "About",
    "title": "Contributing",
    "category": "section",
    "text": "If you like this package, consider contributing! You can send bug reports (or fix them and send your code), add examples to the documentation, or propose new features.Below some conventions that we follow when contributing to this package are detailed. For specific guidelines on documentation, see the Documentations Guidelines wiki."
},

{
    "location": "about.html#Branches-and-pull-requests-(PR)-1",
    "page": "About",
    "title": "Branches and pull requests (PR)",
    "category": "section",
    "text": "We use a standard pull request policy: You work in a private branch and eventually add a pull request, which is then reviewed by other programmers and merged into the master branch.Each pull request should be pushed in a new branch with the name of the author followed by a descriptive name, e.g., mforets/my_feature. If the branch is associated to a previous discussion in one issue, we use the name of the issue for easier lookup, e.g., mforets/7."
},

{
    "location": "about.html#Unit-testing-and-continuous-integration-(CI)-1",
    "page": "About",
    "title": "Unit testing and continuous integration (CI)",
    "category": "section",
    "text": "This project is synchronized with Travis CI such that each PR gets tested before merging (and the build is automatically triggered after each new commit). For the maintainability of this project, it is important to understand and fix the failing doctests if they exist. We develop in Julia v0.6.0, but for experimentation we also build on the nightly branch.When you modify code in this package, you should make sure that all unit tests pass. To run the unit tests locally, you should do:$ julia --color=yes test/runtests.jlAlternatively, you can achieve the same from inside the REPL using the following command:julia> Pkg.test(\"MathematicalSystems\")We also advise adding new unit tests when adding new features to ensure long-term support of your contributions."
},

{
    "location": "about.html#Contributing-to-the-documentation-1",
    "page": "About",
    "title": "Contributing to the documentation",
    "category": "section",
    "text": "New functions and types should be documented according to our guidelines directly in the source code.You can view the source code documentation from inside the REPL by typing ? followed by the name of the type or function. For example, the following command will print the documentation of the AbstractSystem type:julia> ?LinearContinuousSystemThis documentation you are currently reading is written in Markdown, and it relies on Documenter.jl to produce the HTML layout. The sources for creating this documentation are found in docs/src. You can easily include the documentation that you wrote for your functions or types there (see the Documenter.jl guide or our sources for examples).To generate the documentation locally, run make.jl, e.g., by executing the following command in the terminal:$ julia --color=yes docs/make.jlNote that this also runs all doctests which will take some time."
},

{
    "location": "about.html#Related-projects-1",
    "page": "About",
    "title": "Related projects",
    "category": "section",
    "text": "This package originated from Hybrid Systems and systems definitions for reachability problems within JuliaReach.Below we list more related projects.Package name Description\nHybridSystems.jl Hybrid Systems definitions in Julia.\nLTISystems.jl Julia package for representing linear time-invariant system models and operations defined on them.\nControlToolbox.jl Analysis and design tools for control systems.\nronisbr/ControlToolbox.jl A Control Toolbox for Julia language.\nDynamicalSystemsBase.jl Definitions of core system and data types used in the ecosystem of DynamicalSystems.jl.\nControlSystems.jl A Control Systems Toolbox for Julia\nModelingToolkit.jl A toolkit for modeling and creating DSLs for Scientific Computing in Julia"
},

{
    "location": "about.html#Credits-1",
    "page": "About",
    "title": "Credits",
    "category": "section",
    "text": "These persons have contributed to MathematicalSystems.jl (in alphabetic order):Marcelo Forets\nBenoît Legat\nChristian Schilling"
},

]}
