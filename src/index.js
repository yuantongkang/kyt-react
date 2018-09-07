import {createElement ,render ,} from './element'

let dom  = createElement('ul',{class:'list'},[
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['b'])
])
let el = render(dom)
console.log(el)