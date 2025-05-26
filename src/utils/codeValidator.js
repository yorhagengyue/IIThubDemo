import { useCallback, useMemo } from 'react';

// CSS code validation utility
export class CodeValidator {
  constructor() {
    this.cssParser = new CSSParser();
  }

  // Validate level code
  validateLevel(code, validation) {
    const results = {
      isValid: false,
      passedRules: 0,
      totalRules: validation.rules.length,
      errors: [],
      warnings: []
    };

    try {
      const parsedCSS = this.cssParser.parse(code);
      
      for (const rule of validation.rules) {
        const ruleResult = this.validateRule(parsedCSS, rule);
        if (ruleResult.passed) {
          results.passedRules++;
        } else {
          results.errors.push({
            rule: rule,
            message: ruleResult.message || rule.message,
            suggestion: ruleResult.suggestion
          });
        }
      }

      results.isValid = results.passedRules === results.totalRules;
      
    } catch (error) {
      results.errors.push({
        message: 'Code parsing error: ' + error.message,
        type: 'syntax'
      });
    }

    return results;
  }

  // Validate single rule
  validateRule(parsedCSS, rule) {
    const selector = rule.selector;
    const property = rule.property;
    
    // Find matching CSS rules
    const matchingRules = this.findMatchingRules(parsedCSS, selector);
    
    if (matchingRules.length === 0) {
      return {
        passed: false,
        message: `Selector ${selector} not found`,
        suggestion: `Please make sure to add the ${selector} selector`
      };
    }

    // Check property values
    for (const cssRule of matchingRules) {
      const value = this.getPropertyValue(cssRule, property);
      
      if (!value) {
        continue;
      }

      // Check based on validation type
      if (rule.expectedValue) {
        if (this.normalizeValue(value) === this.normalizeValue(rule.expectedValue)) {
          return { passed: true };
        }
      }
      
      if (rule.expectedPattern) {
        if (rule.expectedPattern.test(value)) {
          return { passed: true };
        }
      }
    }

    return {
      passed: false,
      message: rule.message,
      suggestion: this.generateSuggestion(rule)
    };
  }

  // Find matching CSS rules
  findMatchingRules(parsedCSS, selector) {
    return parsedCSS.rules.filter(rule => {
      if (rule.type !== 'rule') return false;
      return rule.selectors.some(sel => 
        this.normalizeSelector(sel) === this.normalizeSelector(selector)
      );
    });
  }

  // Get property value
  getPropertyValue(rule, property) {
    const declaration = rule.declarations.find(decl => 
      decl.property === property && decl.type === 'declaration'
    );
    return declaration ? declaration.value : null;
  }

  // Normalize value (remove spaces, unify format)
  normalizeValue(value) {
    return value.toString().toLowerCase().replace(/\s+/g, ' ').trim();
  }

  // Normalize selector
  normalizeSelector(selector) {
    return selector.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  // Generate suggestion
  generateSuggestion(rule) {
    if (rule.expectedValue) {
      return `Try setting ${rule.property}: ${rule.expectedValue}`;
    }
    if (rule.expectedPattern) {
      return `Please check the format of the ${rule.property} property`;
    }
    return 'Please check if the code is correct';
  }
}

// Simplified CSS parser
class CSSParser {
  parse(cssText) {
    const rules = [];
    const ruleRegex = /([^{]+)\{([^}]+)\}/g;
    let match;

    while ((match = ruleRegex.exec(cssText)) !== null) {
      const selectors = match[1].split(',').map(s => s.trim());
      const declarationsText = match[2];
      const declarations = this.parseDeclarations(declarationsText);

      rules.push({
        type: 'rule',
        selectors,
        declarations
      });
    }

    return { rules };
  }

  parseDeclarations(declarationsText) {
    const declarations = [];
    const declRegex = /([^:]+):([^;]+);?/g;
    let match;

    while ((match = declRegex.exec(declarationsText)) !== null) {
      const property = match[1].trim();
      const value = match[2].trim();

      if (property && value) {
        declarations.push({
          type: 'declaration',
          property,
          value
        });
      }
    }

    return declarations;
  }
}

// Real-time validation Hook
export function useCodeValidation(level, code) {
  // Memoize the validator instance to prevent recreation
  const validator = useMemo(() => new CodeValidator(), []);
  
  // Memoize the validate function to prevent infinite re-renders
  const validate = useCallback(() => {
    if (!level?.validation || !code) {
      return { isValid: false, errors: [], passedRules: 0, totalRules: 0 };
    }
    
    return validator.validateLevel(code, level.validation);
  }, [level?.validation, code, validator]);

  return { validate };
} 