/** Accept HTTPS resources or workspace-relative public assets, never executable URLs. */
export function isSafeImagePath(value:unknown):value is string {
 if(typeof value!=='string'||!value||/[\u0000-\u0020\\]/.test(value))return false;
 if(/^https:\/\//i.test(value)){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}}
 if(value.startsWith('/')||/[:?#]/.test(value))return false;
 try{let decoded=value;for(let i=0;i<3;i++)decoded=decodeURIComponent(decoded);return !decoded.split('/').some(p=>p==='..'||p==='.')&&!/[\\:\u0000-\u0020]/.test(decoded);}catch{return false;}
}
