function validator(cpf) {
  if (!cpf) return false;

  const cleanCpf = cpf.replace('.', '').replace('-', '');
  if (cleanCpf.length !== 11) return false;

  const cpfArr = cleanCpf.split('').map((item) => +item);

  if (mod11(cpfArr.slice(0, 9)) !== cpfArr[9]) return false;

  return mod11(cpfArr.slice(0, 10)) === cpfArr[10];
}

function mod11(arr) {
  let sum = 0;

  for (let i = arr.length - 1; i >= 0; i -= 1)
    sum += (arr.length - i + 1) * arr[i];

  sum %= 11;

  return sum < 2 ? 0 : 11 - sum;
}

export default (rule, value, callback) => {
  const { message = 'Insira um CPF válido.' } = rule;

  if (!validator(value)) return callback(message);

  return callback();
};
