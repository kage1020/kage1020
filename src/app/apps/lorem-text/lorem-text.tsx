"use client"

import { cn } from "@/utils"
import { useState } from "react"
import { FaCheck, FaCopy, FaRandom } from "react-icons/fa"

interface GeneratorOption {
  id: string
  name: string
  endpoint: string
  hasLength: boolean
  description: string
  category: string
  hasAuthor?: boolean
}

const generators: GeneratorOption[] = [
  // Unique Identifiers
  {
    id: "cuid",
    name: "CUID",
    endpoint: "/cuid",
    hasLength: false,
    description: "Collision-resistant unique identifier",
    category: "Identifiers",
  },
  {
    id: "cuid2",
    name: "CUID2",
    endpoint: "/cuid2",
    hasLength: false,
    description: "Improved CUID with better performance",
    category: "Identifiers",
  },
  {
    id: "uuid4",
    name: "UUID v4",
    endpoint: "/uuidv4",
    hasLength: false,
    description: "Random UUID version 4",
    category: "Identifiers",
  },
  {
    id: "uuid7",
    name: "UUID v7",
    endpoint: "/uuidv7",
    hasLength: false,
    description: "Time-ordered UUID version 7",
    category: "Identifiers",
  },
  {
    id: "ulid",
    name: "ULID",
    endpoint: "/ulid",
    hasLength: false,
    description: "Universally Unique Lexicographically Sortable Identifier",
    category: "Identifiers",
  },

  // Random Data
  {
    id: "hex",
    name: "Hex",
    endpoint: "/hex",
    hasLength: true,
    description: "Hexadecimal characters (0-9, a-f)",
    category: "Random Data",
  },
  {
    id: "number",
    name: "Numbers",
    endpoint: "/number",
    hasLength: true,
    description: "Numeric characters (0-9)",
    category: "Random Data",
  },
  {
    id: "alphabet",
    name: "Alphabet",
    endpoint: "/alphabet",
    hasLength: true,
    description: "Mixed case letters (A-Z, a-z)",
    category: "Random Data",
  },
  {
    id: "alpha-upper",
    name: "Alpha Upper",
    endpoint: "/alphaUpper",
    hasLength: true,
    description: "Uppercase letters (A-Z)",
    category: "Random Data",
  },
  {
    id: "alpha-lower",
    name: "Alpha Lower",
    endpoint: "/alphaLower",
    hasLength: true,
    description: "Lowercase letters (a-z)",
    category: "Random Data",
  },
  {
    id: "alphanum",
    name: "Alphanumeric",
    endpoint: "/alphaNumeric",
    hasLength: true,
    description: "Letters and numbers (mixed case)",
    category: "Random Data",
  },
  {
    id: "alphanum-upper",
    name: "Alphanum Upper",
    endpoint: "/alphaNumericUpper",
    hasLength: true,
    description: "Uppercase letters and numbers",
    category: "Random Data",
  },
  {
    id: "alphanum-lower",
    name: "Alphanum Lower",
    endpoint: "/alphaNumericLower",
    hasLength: true,
    description: "Lowercase letters and numbers",
    category: "Random Data",
  },
  {
    id: "symbol",
    name: "Symbols",
    endpoint: "/symbol",
    hasLength: true,
    description: "Special characters and symbols",
    category: "Random Data",
  },
  {
    id: "alphanum-symbol",
    name: "Alphanum + Symbols",
    endpoint: "/alphaNumericSymbol",
    hasLength: true,
    description: "Letters, numbers, and symbols (mixed case)",
    category: "Random Data",
  },
  {
    id: "alphanum-symbol-upper",
    name: "Alphanum + Symbols Upper",
    endpoint: "/alphaNumericSymbolUpper",
    hasLength: true,
    description: "Uppercase letters, numbers, and symbols",
    category: "Random Data",
  },
  {
    id: "alphanum-symbol-lower",
    name: "Alphanum + Symbols Lower",
    endpoint: "/alphaNumericSymbolLower",
    hasLength: true,
    description: "Lowercase letters, numbers, and symbols",
    category: "Random Data",
  },

  // Japanese
  {
    id: "hiragana",
    name: "Hiragana",
    endpoint: "/hiragana",
    hasLength: true,
    description: "Japanese Hiragana characters",
    category: "Japanese",
  },
  {
    id: "katakana",
    name: "Katakana",
    endpoint: "/katakana",
    hasLength: true,
    description: "Japanese Katakana characters",
    category: "Japanese",
  },
  {
    id: "kanji",
    name: "Kanji",
    endpoint: "/kanji",
    hasLength: true,
    description: "Japanese Kanji characters",
    category: "Japanese",
  },
  {
    id: "kanji2",
    name: "Kanji (Level 2)",
    endpoint: "/kanji2",
    hasLength: true,
    description: "Japanese Kanji characters (Level 2)",
    category: "Japanese",
  },
  {
    id: "japanese",
    name: "Mixed Japanese",
    endpoint: "/japanese",
    hasLength: true,
    description: "Mixed Japanese characters",
    category: "Japanese",
  },

  // Text & Crypto
  {
    id: "lorem",
    name: "Lorem Ipsum",
    endpoint: "/lorem",
    hasLength: true,
    description: "Lorem ipsum placeholder text",
    category: "Text",
  },
  {
    id: "author",
    name: "Author Text",
    endpoint: "",
    hasLength: true,
    hasAuthor: true,
    description: "Text in Japanese author style",
    category: "Text",
  },
  {
    id: "person-name",
    name: "Japanese Names",
    endpoint: "/person/first-last",
    hasLength: true,
    description: "Random Japanese person names",
    category: "Text",
  },
  {
    id: "rsa-jwk",
    name: "RSA JWK",
    endpoint: "/rsa/jwk",
    hasLength: false,
    description: "RSA JSON Web Key",
    category: "Cryptographic",
  },
  {
    id: "rsa-pem",
    name: "RSA PEM",
    endpoint: "/rsa/pem",
    hasLength: false,
    description: "RSA PEM format key",
    category: "Cryptographic",
  },
]

const groupedGenerators = generators.reduce((acc, gen) => {
  if (!acc[gen.category]) {
    acc[gen.category] = []
  }
  acc[gen.category].push(gen)
  return acc
}, {} as Record<string, GeneratorOption[]>)

export default function LoremText() {
  const [selectedGenerator, setSelectedGenerator] = useState<GeneratorOption>(
    generators[0]
  )
  const [length, setLength] = useState(10)
  const [selectedAuthor, setSelectedAuthor] = useState("akutagawa")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [parsedResult, setParsedResult] = useState<Record<
    string,
    unknown
  > | null>(null)

  const authorOptions = [
    { value: "akutagawa", label: "Akutagawa" },
    { value: "dazai", label: "Dazai" },
    { value: "edogawa", label: "Edogawa" },
    { value: "natsume", label: "Natsume" },
  ]

  const generateData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        endpoint: selectedGenerator.hasAuthor
          ? `/${selectedAuthor}`
          : selectedGenerator.endpoint,
        ...(selectedGenerator.hasLength && { length: length.toString() }),
      })

      const url = `/api/lorem?${params.toString()}`
      const response = await fetch(url)
      const data = await response.text()
      setResult(data)

      if (
        selectedGenerator.category === "Cryptographic" ||
        selectedGenerator.id === "person-name"
      ) {
        try {
          const jsonData = JSON.parse(data)
          setParsedResult(jsonData)
        } catch {
          setParsedResult(null)
        }
      } else {
        setParsedResult(null)
      }
    } catch (error) {
      console.error("Error generating data:", error)
      setResult("Error generating data")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-start">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Generator Type</h3>

          {Object.entries(groupedGenerators).map(([category, gens]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300">{category}</h4>
              <div className="grid grid-cols-1 gap-2">
                {gens.map((gen) => (
                  <button
                    key={gen.id}
                    onClick={() => {
                      setSelectedGenerator(gen)
                      setResult("")
                      setParsedResult(null)
                    }}
                    className={cn(
                      "p-3 rounded-lg text-left transition-colors",
                      selectedGenerator.id === gen.id
                        ? "bg-blue-600 text-white"
                        : "bg-[#111111] hover:bg-[#1a1a1a] text-gray-300"
                    )}
                  >
                    <div className="font-medium">{gen.name}</div>
                    <div className="text-xs opacity-75">{gen.description}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 sticky top-4">
          <h3 className="text-lg font-semibold">Configuration</h3>

          <div className="bg-[#111111] rounded-lg p-4 space-y-4">
            <div>
              <h4 className="font-medium mb-2">{selectedGenerator.name}</h4>
              <p className="text-sm text-gray-400 mb-4">
                {selectedGenerator.description}
              </p>

              {selectedGenerator.hasAuthor && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Author</label>
                  <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-black rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  >
                    {authorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedGenerator.hasLength && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Length</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) =>
                      setLength(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    min="1"
                    max="1000"
                    className="w-full px-3 py-2 bg-black rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}

              <button
                onClick={generateData}
                disabled={loading}
                className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded transition-colors flex items-center justify-center gap-2"
              >
                <FaRandom size={14} />
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>

          {result && (
            <div className="bg-[#111111] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Result</h4>
                <button
                  onClick={copyToClipboard}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2",
                    copied
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  )}
                >
                  {copied && (
                    <>
                      <FaCheck size={12} />
                      Copied!
                    </>
                  )}
                  {!copied && (
                    <>
                      <FaCopy size={12} />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="bg-black p-3 rounded border border-gray-600 font-mono text-sm">
                {parsedResult && (
                  <div className="space-y-2">
                    {selectedGenerator.id === "person-name" &&
                      Array.isArray(parsedResult) && (
                        <div className="grid grid-cols-1 gap-1">
                          {parsedResult.map(
                            (name: Record<string, unknown>, index: number) => (
                              <div key={index} className="text-gray-300">
                                {typeof name === "object" &&
                                name.first &&
                                name.last
                                  ? `${name.last} ${name.first}`
                                  : String(name)}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    {(selectedGenerator.id !== "person-name" ||
                      !Array.isArray(parsedResult)) &&
                      selectedGenerator.category === "Cryptographic" && (
                        <pre className="whitespace-pre-wrap break-all">
                          {JSON.stringify(parsedResult, null, 2)}
                        </pre>
                      )}
                    {selectedGenerator.id !== "person-name" &&
                      !Array.isArray(parsedResult) &&
                      selectedGenerator.category !== "Cryptographic" && (
                        <div className="break-all">{result}</div>
                      )}
                  </div>
                )}
                {!parsedResult &&
                  (selectedGenerator.id === "lorem" ||
                    selectedGenerator.id === "author") && (
                    <div className="whitespace-pre-wrap">{result}</div>
                  )}
                {!parsedResult &&
                  selectedGenerator.id !== "lorem" &&
                  selectedGenerator.id !== "author" && (
                    <div className="break-all">{result}</div>
                  )}
              </div>

              <div className="text-xs text-gray-400">
                API Endpoint:{" "}
                <code className="bg-gray-800 px-1 rounded">
                  {selectedGenerator.hasAuthor
                    ? `/${selectedAuthor}/${length}`
                    : selectedGenerator.hasLength
                    ? `${selectedGenerator.endpoint}/${length}`
                    : selectedGenerator.endpoint}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
