export class Image {
    _id: string;
    name: string;
    path: string;
    state: number;
    src: string;
    _v: string;
    constructor(_id:string,name:string,path:string,state:number,src:string,_v:string) {
        this._id = _id,
        this.name = name,
        this.path = path,
        this.state = state,
        this.src = src,
        this._v = _v
    }
}