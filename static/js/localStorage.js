const nickName = "nickNmae";

function setNickName(name) {
  localStorage.setItem(nickName, name);
}

function getNickName() {
  const name = localStorage.getItem(nickName);
  if (name != null) return name;
}
