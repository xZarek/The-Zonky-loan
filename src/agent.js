import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

let API_ROOT = "";
if (process.env.NODE_ENV === 'production') {
    API_ROOT = 'https://api.zonky.cz'
} else {
    API_ROOT = ''
}


const responseBody = res => res.body;

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
    }
    return err;
};
const requests = {
    del: url =>
        superagent
            .del(`${API_ROOT}${url}`)
            .end(handleErrors)
            .then(responseBody),
    get: (url, body) =>
        superagent
            .get(`${API_ROOT}${url}`)


            .end(handleErrors)
            .then(responseBody),

};

const Marketplace = {
    //Vytvoření přijatého dokladu.
    getLoan: () => requests.get(`/loans/marketplace`),
};


export default {
    requests,
    Marketplace

};
