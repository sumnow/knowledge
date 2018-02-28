# vue responsive theory

    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                message: 'hello'
            },
            render (h) {
                return h('div', {}, [
                    h('p', {}, this.message)
                ])
            }
        })

        setTimeout(()=>{
            vm.messgae = 'girl'
        },1000);
    </script>

    