// Tool relationship mapping for inter-tool linking
export const toolRelationships = {
  'tax-calculator': {
    name: 'Tax Calculator',
    url: 'https://larrys-world.github.io/tax-calculator/',
    related: ['investment-calculator', 'mortgage-calculator', 'business-loan-calculator', 'freelance-rate-calculator'],
    description: 'Calculate your taxes with our easy-to-use tax calculator'
  },
  'investment-calculator': {
    name: 'Investment Calculator',
    url: 'https://larrys-world.github.io/investment-calculator/',
    related: ['tax-calculator', 'mortgage-calculator', 'business-loan-calculator', 'percentage-calculator'],
    description: 'Plan your investments and calculate returns'
  },
  'mortgage-calculator': {
    name: 'Mortgage Calculator',
    url: 'https://larrys-world.github.io/mortgage-calculator/',
    related: ['investment-calculator', 'tax-calculator', 'percentage-calculator', 'business-loan-calculator'],
    description: 'Calculate mortgage payments and total interest'
  },
  'business-loan-calculator': {
    name: 'Business Loan Calculator',
    url: 'https://larrys-world.github.io/business-loan-calculator/',
    related: ['freelance-rate-calculator', 'tax-calculator', 'investment-calculator', 'percentage-calculator'],
    description: 'Calculate business loan payments and interest'
  },
  'freelance-rate-calculator': {
    name: 'Freelance Rate Calculator',
    url: 'https://larrys-world.github.io/freelance-rate-calculator/',
    related: ['business-loan-calculator', 'tax-calculator', 'percentage-calculator', 'investment-calculator'],
    description: 'Determine your ideal freelance hourly rate'
  },
  'percentage-calculator': {
    name: 'Percentage Calculator',
    url: 'https://larrys-world.github.io/percentage-calculator/',
    related: ['tip-calculator', 'tax-calculator', 'investment-calculator', 'unit-converter'],
    description: 'Calculate percentages, increases, and decreases'
  },
  'tip-calculator': {
    name: 'Tip Calculator',
    url: 'https://larrys-world.github.io/tip-calculator/',
    related: ['percentage-calculator', 'tax-calculator', 'unit-converter'],
    description: 'Calculate tips and split bills easily'
  },
  'unit-converter': {
    name: 'Unit Converter',
    url: 'https://larrys-world.github.io/unit-converter/',
    related: ['percentage-calculator', 'tip-calculator', 'bmi-calculator'],
    description: 'Convert between different units of measurement'
  },
  'password-generator': {
    name: 'Password Generator',
    url: 'https://larrys-world.github.io/password-generator/',
    related: ['qr-code-generator', 'lorem-ipsum-generator', 'word-counter'],
    description: 'Generate secure passwords for your accounts'
  },
  'qr-code-generator': {
    name: 'QR Code Generator',
    url: 'https://larrys-world.github.io/qr-code-generator/',
    related: ['password-generator', 'lorem-ipsum-generator', 'word-counter'],
    description: 'Create QR codes for URLs, text, and more'
  },
  'lorem-ipsum-generator': {
    name: 'Lorem Ipsum Generator',
    url: 'https://larrys-world.github.io/lorem-ipsum-generator/',
    related: ['word-counter', 'password-generator', 'qr-code-generator'],
    description: 'Generate placeholder text for your designs'
  },
  'word-counter': {
    name: 'Word Counter',
    url: 'https://larrys-world.github.io/word-counter/',
    related: ['lorem-ipsum-generator', 'password-generator', 'percentage-calculator'],
    description: 'Count words, characters, and paragraphs'
  },
  'bmi-calculator': {
    name: 'BMI Calculator',
    url: 'https://larrys-world.github.io/bmi-calculator/',
    related: ['age-calculator', 'unit-converter', 'percentage-calculator'],
    description: 'Calculate your Body Mass Index'
  },
  'age-calculator': {
    name: 'Age Calculator',
    url: 'https://larrys-world.github.io/age-calculator/',
    related: ['bmi-calculator', 'percentage-calculator', 'unit-converter'],
    description: 'Calculate age in years, months, and days'
  }
};

export function getRelatedTools(currentTool: string) {
  const tool = toolRelationships[currentTool];
  if (!tool) return [];
  
  return tool.related.map(relatedKey => toolRelationships[relatedKey]).filter(Boolean);
}

export function getAllTools() {
  return Object.values(toolRelationships);
}