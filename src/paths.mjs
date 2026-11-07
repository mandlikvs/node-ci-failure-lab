import path from 'node:path';
// Lexical path containment; not a security boundary against symlinks.
export function isWithinDirectory(base, candidate) {
  const rel = path.relative(path.resolve(base), path.resolve(candidate));
  return rel === '' || (rel !== '..' && !rel.startsWith(`..${path.sep}`) && !path.isAbsolute(rel));
}
