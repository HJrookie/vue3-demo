import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}

export function getUserList(params) {
  return request({
    url: "/user/list",
    method: "get",
    params,
  });
}

export function deleteUser(data) {
  return request({
    url: "/user/delete",
    method: "post",
    data: data,
  });
}

export function editUser(data) {
  return request({
    url: "/user/edit",
    method: "post",
    data: data,
  });
}

// http://192.168.31.246:8080/getRouters

export function getRouters() {
  return request({
    url: "/getRouters",
    method: "get",
  });
}

export function getInfo() {
  return request({
    url: "/getInfo",
    method: "get",
  });
}

// 查询授权角色
export function getAuthRole(userId) {
  return request({
    url: "/system/user/authRole/" + userId,
    method: "get",
  });
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: "/system/user/authRole",
    method: "put",
    params: data,
  });
}

export function getCodeImg() {
  return request({
    headers: {
      isToken: false,
    },
    url: "/captchaImage",
    method: "get",
    timeout: 20000,
  });
}

export function getInstitutionInfo() {
  return request({
    url: "/getInstitutionInfo/user/authRole",
    method: "get",
  });
}

export function saveInstitutionInfo(data) {
  return request({
    url: "/save/user/authRole",
    method: "post",
    data,
  });
}

export function getPersionalInfo() {
  return request({
    url: "/getPersionalInfo/user/authRole",
    method: "get",
  });
}

export function savePersonInfo(data) {
  return request({
    url: "/save/user/savePersonInfo",
    method: "post",
    data,
  });
}

export function getCurUserInfo() {
  return request({
    url: "/system/user/userInfo",
    method: "get",
  });
}

// 个人用户  编辑信息
export function savePersonalInfo(data) {
  return request({
    url: "/system/user/person/save",
    method: "post",
    data,
  });
}

// 参赛单位  编辑信息
export function saveCsInfo(data) {
  return request({
    url: "/system/user/org/save",
    method: "post",
    data,
  });
}
