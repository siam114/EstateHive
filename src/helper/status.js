export default function isSuccessful(status) {
    return 200 <= status && status <= 299;
  }