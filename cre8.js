function cre8 (tag, obj, parent) {
  const el = document.createElement(tag)
  if (obj) Object.keys(obj).forEach(key => el[key] = obj[key])
  if (parent) parent.appendChild(el)
  return el
}