function sanitizePowershell(code) {
  const replaceKey = 'THISWILLBEREPLACED';
  return (
    code
      // $$
      .replace('$$', replaceKey + replaceKey)
      // variables
      .replace(/\$([a-zA-Z])/g, replaceKey + '$1')
      // $ followed by anything except { (for ${1}) or a digit (for $2 or $1)
      .replace(/\$([^{\d])/g, replaceKey + '$1')
      // replace all things ready for an escaped $
      .replace(/THISWILLBEREPLACED/g, '\\$')
  );
}

function cleanBody(code, languageId) {
  // Because of the VSCode is compatible with TextMate.
  // Backslash has some different behaviour.
  code = code.replace("\\", "\\\\");
  if (languageId === 'powershell') {
    return sanitizePowershell(code.replace(/\t/g, '\\t'));
  } else {
    return code.replace(/\t/g, '\\t');
  }
}

function createBody(code, languageId) {
  const body = cleanBody(code, languageId);

  return body.split('\n');
}

module.exports = {
  createBody,
  sanitizePowershell
};
