export const isFirstnameValid = (firstname: string): boolean => {
  return firstname !== '' && firstname.search('admin') === -1
}

export const isLastnameValid = (lastname: string): boolean => {
  return lastname !== '' && lastname.search('admin') === -1
}
