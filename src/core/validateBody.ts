import validator from 'validator';

interface ValidateBodyRules {
  [key: string]: {
    type: 'string' | 'number';
    isEmail?: boolean;
    isRequired?: boolean;
  }
}

interface ErrorResult {
  field: string;
  error: string;
}

export function validateBody(body: Record<string, any>, rules: ValidateBodyRules): ErrorResult[] {
  const errors = [] as ErrorResult[];

  Object.entries(rules).forEach(([key, rule]) => {
    if (rule.isRequired && (body[key] === null || body[key] === undefined)) {
      errors.push({ field: key, error: 'required' });
      return;
    }

    if (typeof body[key] !== rule.type) {
      errors.push({ field: key, error: 'invalidType' });
      return;
    }

    if (rule.isEmail && !validator.isEmail(body[key])) {
      errors.push({ field: key, error: 'invalidEmail' });
    }
  });

  return errors;
}
