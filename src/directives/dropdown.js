import Vue from 'vue'

Vue.directive('dropdown', {
    bind: function (el) {
        let conf = {
            position: 'left'
        }

        el.addEventListener('click', (e) => {
            let target = e.target.dataset.target
            conf.position = e.target.dataset.position ? e.target.dataset.position : conf.position
            document.querySelectorAll('.dropdown[data-target=' + target +']').forEach((node) => {
                node.style.top = (e.target.offsetTop + e.target.offsetHeight + 10) + 'px'
                node.style[conf.position != 'left' ? 'right' : 'left'] =  0;
                node.classList.add("active");
            })
        }, false)

        window.document.addEventListener('click', (e) => {
            if ( ! e.target.dataset.target) {
                document.querySelectorAll('.dropdown').forEach((node) => {
                    node.classList.remove("active")
                })
            }
        })
    }
})