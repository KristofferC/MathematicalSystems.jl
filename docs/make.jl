using Documenter, MathematicalSystems

DocMeta.setdocmeta!(MathematicalSystems, :DocTestSetup,
                    :(using MathematicalSystems); recursive=true)

makedocs(
    sitename = "MathematicalSystems.jl",
    modules = [MathematicalSystems],
    format = Documenter.HTML(prettyurls = get(ENV, "CI", nothing) == "true",
                             assets = ["assets/juliareach.css"]),
    pages = [
        "Home" => "index.md",
        "Library" => Any[
        "Types" => "lib/types.md",
        "Methods" => "lib/methods.md"],
        "About" => "about.md"
    ],
    strict = true
)

deploydocs(
    repo = "github.com/JuliaReach/MathematicalSystems.jl.git",
)
