<script>
    export default {
        name: "xxx",
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
            this.loadModuleData();
        },
        methods: {
            /**
             * 产品数据获取
             */
            loadProductData() {
                let params = {
                    uid: xxx
                }
                this.$request.getProduct(
                    params
                ).then((data)=>{ // 直接拿到的就是成功数据，其他情况封装的时候统一处理
                    data.forEach(data => {
                        this.tableData.push({
                            id: data.id || '',
                            name: data.name || '',
                            desc: data.desc || '',
                        })
                    })
                });
            },
           // 文件上传
          uploadFile(file){
                let params = new FormData();
                params.append('file', file);
                params.append('ucenter_id', this.$store.getUserId());
                this.$request.uploadImage(
                    uploadData
                ).then((res) => {
                    console.log(res);
                });
            }
        }
    }
</script>