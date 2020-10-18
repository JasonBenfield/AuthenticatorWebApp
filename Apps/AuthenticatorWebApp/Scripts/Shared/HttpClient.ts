export class HttpPostResult {
    constructor(
        public readonly result: any,
        public readonly url: string,
        public readonly status: number,
        public readonly responseText: string
    ) {
    }

    isSuccessful() {
        return this.status === 200;
    }

    toString() {
        return `${this.url}\r\n${this.status}\r\n${this.responseText}\r\n${this.result}`;
    }
}

export class HttpClient {
    get(url: string) {
        return this.execute('GET', url);
    }

    post(url: string, data: string) {
        return this.execute('POST', url, data);
    }

    private execute(method: string, url: string, body?: string) {
        return new Promise<HttpPostResult>((resolve) => {
            function reqListener() {
                console.log(this.responseText);
            }
            let oReq = new XMLHttpRequest();
            oReq.withCredentials = true;
            oReq.onreadystatechange = () => {
                if (oReq.readyState == 4) {
                    let result: any;
                    if (method === 'GET') {
                        result = oReq.responseText;
                    }
                    else if (!/^\s*[{\[]\s*.*[\]}]\s*$/.test(oReq.responseText)) {
                        let responseText = oReq.responseText;
                        if (!responseText) {
                            responseText = 'null';
                        }
                        responseText = `{ "data": ${responseText} }`;
                        let dataResult = JSON.parse(responseText);
                        result = dataResult.data;
                    }
                    else {
                        result = JSON.parse(oReq.responseText);
                    }
                    resolve(new HttpPostResult(result, url, oReq.status, oReq.responseText));
                }
            };
            oReq.addEventListener("load", reqListener.bind(oReq));
            oReq.open(method, url);
            if (method === 'POST') {
                oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            }
            oReq.send(body);
        });
    }
}