// Tool relationship mapping for inter-tool linking

type ToolInfo = {
  name: string;
  url: string;
  related: string[];
  description: string;
};

type ToolRelationships = {
  [key: string]: ToolInfo;
};

export const toolRelationships: ToolRelationships = {
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
  'password-generator': {
    name: 'Password Generator',
    url: 'https://larrys-world.github.io/password-generator/',
    related: ['qr-code-generator', 'lorem-ipsum-generator'],
    description: 'Generate secure passwords with custom options'
  },
  'unit-converter': {
    name: 'Unit Converter',
    url: 'https://larrys-world.github.io/unit-converter/',
    related: ['percentage-calculator', 'tip-calculator', 'bmi-calculator'],
    description: 'Convert between different units of measurement'
  },
  'business-loan-calculator': {
    name: 'Business Loan Calculator',
    url: 'https://larrys-world.github.io/business-loan-calculator/',
    related: ['mortgage-calculator', 'investment-calculator', 'tax-calculator', 'freelance-rate-calculator'],
    description: 'Calculate business loan payments and interest'
  },
  'lorem-ipsum-generator': {
    name: 'Lorem Ipsum Generator',
    url: 'https://larrys-world.github.io/lorem-ipsum-generator/',
    related: ['word-counter', 'password-generator'],
    description: 'Generate placeholder text for your designs'
  },
  'freelance-rate-calculator': {
    name: 'Freelance Rate Calculator',
    url: 'https://larrys-world.github.io/freelance-rate-calculator/',
    related: ['tax-calculator', 'business-loan-calculator', 'investment-calculator'],
    description: 'Calculate your ideal freelance hourly rate'
  },
  'percentage-calculator': {
    name: 'Percentage Calculator',
    url: 'https://larrys-world.github.io/percentage-calculator/',
    related: ['tip-calculator', 'investment-calculator', 'mortgage-calculator'],
    description: 'Calculate percentages, increases, and decreases'
  },
  'tip-calculator': {
    name: 'Tip Calculator',
    url: 'https://larrys-world.github.io/tip-calculator/',
    related: ['percentage-calculator', 'unit-converter'],
    description: 'Calculate tips and split bills easily'
  },
  'word-counter': {
    name: 'Word Counter',
    url: 'https://larrys-world.github.io/word-counter/',
    related: ['lorem-ipsum-generator'],
    description: 'Count words, characters, and paragraphs in your text'
  },
  'bmi-calculator': {
    name: 'BMI Calculator',
    url: 'https://larrys-world.github.io/bmi-calculator/',
    related: ['unit-converter', 'age-calculator'],
    description: 'Calculate your Body Mass Index'
  },
  'age-calculator': {
    name: 'Age Calculator',
    url: 'https://larrys-world.github.io/age-calculator/',
    related: ['bmi-calculator'],
    description: 'Calculate age in years, months, and days'
  },
  'qr-code-generator': {
    name: 'QR Code Generator',
    url: 'https://larrys-world.github.io/qr-code-generator/',
    related: ['password-generator'],
    description: 'Generate QR codes for URLs, text, and more'
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