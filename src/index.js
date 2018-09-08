import {createElement ,render ,render2Dom} from './element'
import { diff } from './diff'
let dom  = createElement('ul',{class:'list'},[
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['b'])
])

let dom2  = createElement('ul',{class:'list2222'},[
    createElement('li',{class:'items'},['xa333']),
    createElement('div',{class:'item'},['b']),
    createElement('li',{class:'item'},['b'])
]) 

let patches  = diff(dom,dom2)
let el = render(dom)


console.log(patches)    