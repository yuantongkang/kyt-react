import {createElement ,render ,render2Dom} from './element'
import { diff } from './diff'
import patch from './patch'
let dom  = createElement('ul',{class:'list'},[
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['b']),
    createElement('div',{class:'item'},['b']),
    createElement('div',{class:'item'},['b']),
    createElement('div',{class:'item'},['b']),
])

let dom2  = createElement('ul',{class:'list'},[
    createElement('li',{class:'item'},['xa3133']),
    createElement('li',{class:'item'},[createElement('div',{class:'item'},['33123'])]),
    createElement('div',{class:'item'},['b3123']),
    createElement('li',{class:'items'},['b43112'])
]) 
let el2 = render(dom2)
let el = render(dom)
let patches  = diff(dom,dom2)

console.log('el1',el)
console.log('el2',el2)
console.log(patches)    