export async function  genHash(password: string, login: string){
    const group= password + login
    const encoded = Uint8Array.from(group, c => c.charCodeAt(0));
    const hash = await crypto.subtle.digest('SHA-256',encoded);
    const hexHash = Array.from(new Uint8Array( hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    return hexHash;
}

export  function  genHashSync(password: string, login: string){
    genHash(password,login).then(res=>{
        return res
    })
}



