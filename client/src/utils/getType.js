const MARKDOWN_REGEXP = {
  h1: /^\s{0,3}#\s*/g,
  h2: /^\s{0,3}#{2}\s*/g,
  h3: /^\s{0,3}#{3}\s*/g,
  h4: /^\s{0,3}#{4}\s*/g,
  h5: /^\s{0,3}#{5}\s*/g,
  h6: /^\s{0,3}#{6}\s*/g,

  ul: /^\s{0,3}(-|\*|\+)\s*/g,
  ol: /^\s{0,3}\d+.\s*/g,

  blockquote: /^\s{0,3}>\s*/g,

  code: /^(\s{4,}\s*)|\s{0,3}`{3,}/g,

  hr: /^\s{0,3}-{3,}|\*{3,}|_{3,}\s*/g,

  terminal: /^\s{0,3}\${3,}\s*/,
};

const getType = (textContent) => {
  const types = Object.keys(MARKDOWN_REGEXP);
  const result = types.find((type) => {
    const regExp = MARKDOWN_REGEXP[type];
    if (regExp.exec(textContent)) {
      return true;
    }
    return false;
  });
  return result;
};

export default getType;
