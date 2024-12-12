const http = {
    request: function (options) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(options.method, options.url)

            if (options.headers) {
                for (let key in options.headers) {
                    xhr.setRequestHeader(key, options.headers[key])
                }
            }

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(new Error(`Request failed with status ${xhr.status}`))
                }
            }

            xhr.onerror = function () {
                reject(new Error("Network Error"))
            }

            if (options.data && (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH')) {
                xhr.setRequestHeader("Content-Type", "application/json")
                xhr.send(JSON.stringify(options.data))
            } else {
                xhr.send()
            }
        })
    },

    get: function (url, config) {
        return this.request({
            method: 'GET',
            url: url,
            headers: config && config.headers ? config.headers : {}
        });
    },

    post: function (url, data, config) {
        return this.request({
            method: 'POST',
            url: url,
            headers: config && config.headers ? config.headers : {},
            data: data
        })
    },

    put: function (url, data, config) {
        return this.request({
            method: 'PUT',
            url: url,
            headers: config && config.headers ? config.headers : {},
            data: data
        })
    },

    patch: function (url, data, config) {
        return this.request({
            method: 'PATCH',
            url: url,
            headers: config && config.headers ? config.headers : {},
            data: data
        })
    },

    delete: function (url, config) {
        return this.request({
            method: 'DELETE',
            url: url,
            headers: config && config.headers ? config.headers : {}
        });
    }
};

http
  .get('https://fakestoreapi.com/products/categories')
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => console.log("Request completed"))