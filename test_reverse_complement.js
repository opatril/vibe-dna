// Test reverse complement logic with user's genotypes

function normalizeGenotype(gt) {
    if (!gt) return "";
    const clean = String(gt).toUpperCase().replace(/[^ACGT]/g, "");
    if (clean.length !== 2) return clean;
    return clean.split("").sort().join("");
}

function reverseComplement(genotype) {
    if (!genotype) return "";
    const complement = {
        'A': 'T',
        'T': 'A',
        'C': 'G',
        'G': 'C'
    };

    const reversed = genotype.split('').map(base => complement[base] || base).join('');
    // Normalize (sort) the result
    return reversed.split('').sort().join('');
}

// Test cases from user's data
const testCases = [
    {
        snp: "PPARGC1A (rs8192678)",
        userGenotype: "CT",
        dbGenotypes: ["CC", "CG", "GG"],
        expected: "CG"
    },
    {
        snp: "AGT (rs699)",
        userGenotype: "AG",
        dbGenotypes: ["TT", "TC", "CC"],
        expected: "TC"
    },
    {
        snp: "COL1A1 (rs1800012)",
        userGenotype: "AC",
        dbGenotypes: ["TT", "GT", "GG"],
        expected: "GT"
    },
    {
        snp: "GC (rs7041)",
        userGenotype: "AC",
        dbGenotypes: ["GG", "TG", "TT"],
        expected: "GT"
    },
    {
        snp: "MTHFR (rs1801131)",
        userGenotype: "GT",
        dbGenotypes: ["AA", "AC", "CC"],
        expected: "AC"
    }
];

console.log("Testing Reverse Complement Logic\n" + "=".repeat(50));

for (const test of testCases) {
    console.log(`\n${test.snp}:`);
    console.log(`  User genotype: ${test.userGenotype}`);

    const normalized = normalizeGenotype(test.userGenotype);
    console.log(`  Normalized: ${normalized}`);

    const revComp = reverseComplement(normalized);
    console.log(`  Reverse complement: ${revComp}`);

    const dbNormalized = test.dbGenotypes.map(normalizeGenotype);
    console.log(`  Database genotypes: ${dbNormalized.join(", ")}`);

    // Check direct match
    const directMatch = dbNormalized.includes(normalized);
    const revMatch = dbNormalized.includes(revComp);

    console.log(`  Direct match: ${directMatch ? "✓" : "✗"}`);
    console.log(`  Reverse complement match: ${revMatch ? "✓" : "✗"}`);

    if (revMatch) {
        console.log(`  ✅ Match found: ${revComp} (expected: ${normalizeGenotype(test.expected)})`);
    } else if (directMatch) {
        console.log(`  ✅ Direct match: ${normalized}`);
    } else {
        console.log(`  ❌ No match found!`);
    }
}

console.log("\n" + "=".repeat(50));
console.log("Test complete!");
