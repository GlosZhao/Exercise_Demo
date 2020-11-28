import instance from './network';


/**
 * @description:根据请求属性设置请求头 
 * @param {*}
 * @return {*}
 */
function setRequestHead(params, requestCharacter) {
  switch (requestCharacter) {
    case "picture":
      return [
        params, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      ];
    case "json":
      return [
        formToOBJ(params), {
          headers: {
            "Content-Type": "application/json"
          }
        }
      ];
    default:
      return [
        convertFormData(params), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        }
      ];
  }
}

/**
 * @description:转json对象 
 * @param {*} params
 * @return {*}
 */
function formToOBJ(params) {
  return JSON.parse(JSON.stringify(params))
}

/**
 * @description: 将数据表单转FormData格式
 * @param {*} params
 * @return {*}
 */
function convertFormData(params) {
  const paramForm = new URLSearchParams();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      paramForm.append(key, params[key])
    }
  }
  return paramForm;
}


/**
 * @description: 拼接路径
 * @param {*} params
 * @return {*}
 */
export function splicingPath(params) {
  return instance.defaults.baseURL + params;
}


/**
 * @description:get请求
 * @param {}
 * @return {*}
 */
export function apiGet(url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
        params: params
      }).then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })

}

/**
 * @description: post请求
 * @param {*} url
 * @param {*} params
 * @param {*} requestCharacter
 * @return {*}
 */
export function apiPost(url, params, requestCharacter) {
  return new Promise((resolve, reject) => {
    let headerConfig = setRequestHead(params, requestCharacter);
    instance.post(url,
        headerConfig[0],
        headerConfig[1]
      )
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err);
      })
  })
}

/** 
 * @description: put请求
 * @param {*} url
 * @param {*} params
 * @param {*} requestCharacter
 * @return {*}
 */
export function apiPut(url, params, requestCharacter) {
  return new Promise((resolve, reject) => {
    let headerConfig = setRequestHead(params, requestCharacter)
    instance.put(url,
        headerConfig[0],
        headerConfig[1]
      )
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err);
      })
  })
}

/**
 * @description: delete 请求
 * @param {*} url
 * @param {*} params
 * @return {*}
 */
export function apiDelete(url, params) {
  return new Promise((resolve, reject) => {
    instance.delete(url, {
        params: params
      }).then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })

}