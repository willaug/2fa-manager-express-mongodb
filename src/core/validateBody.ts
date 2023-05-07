import validator from 'validator';

interface Rules {
  [key: string]: {
    type: 'string' | 'number';
    isEmail?: boolean;
    isRequired?: boolean;
  }
}

interface DetailedError {
  field: string;
  error: string;
}

interface ErrorResult {
  error: string;
  details: DetailedError[];
}

export function validateBody(body: Record<string, any>, rules: Rules): ErrorResult | null {
  const incorrectFields = [] as DetailedError[];

  Object.entries(rules).forEach(([key, rule]) => {
    if (rule.isRequired && (body[key] === null || body[key] === undefined)) {
      incorrectFields.push({ field: key, error: 'required' });
      return;
    }

    if (typeof body[key] !== rule.type) {
      incorrectFields.push({ field: key, error: 'invalidType' });
      return;
    }

    if (rule.isEmail && !validator.isEmail(body[key])) {
      incorrectFields.push({ field: key, error: 'invalidEmail' });
    }
  });

  if (!incorrectFields.length) return null;

  return {
    error: 'INVALID_PAYLOAD',
    details: incorrectFields,
  };
}
