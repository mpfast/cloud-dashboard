import Text from './Text'
import Image from './Image'
import Vector from './Vector'
import Shape from './Shape'
import Oval from './Oval'

export default {
  install (Vue) {
    Vue.component('v-text', Text)
    Vue.component('v-image', Image)
    Vue.component('v-vector', Vector)
    Vue.component('v-shape', Shape)
    Vue.component('v-oval', Oval)
  }
}
