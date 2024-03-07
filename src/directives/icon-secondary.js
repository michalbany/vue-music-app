export default {
    beforeMount(el, binding) {
        let iconClass = `fa fa-${binding.value.icon} text-xl`

        if (binding.value.right) {
            iconClass += ' float-right'
        }

        if (binding.value.color) {
            iconClass += ` text-${binding.value.color}-400`
        } else {
            iconClass += ' text-black'
        }
    
        el.innerHTML += `<i class="${iconClass}"></i>`
      }
}