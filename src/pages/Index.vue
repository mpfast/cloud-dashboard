<template>
  <v-container fluid>
    <v-layout
      fill-height
      align-content-center
      justify-center
      wrap
      pa-5
      elevation-10
    >
      <v-flex xs12>
        <v-subheader>HTTP API</v-subheader>
      </v-flex>
      <v-flex>
        <v-autocomplete
          v-model="api"
          :items="apis"
          solo
          dense
          item-text="name"
          return-object
        >
          <template v-slot:selection="data">
            <v-chip v-bind="data.attrs" :input-value="data.selected">
              {{ $store.state.baseUrl + data.item.api }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.group"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-flex>
      <v-flex xs12>
        <v-subheader>请求参数</v-subheader>
      </v-flex>
      <v-flex xs12 v-if="api">
        <v-layout wrap v-for="(value, key, index) in api.params" :key="index">
          <v-flex sm6 pr-2>
            <v-text-field :value="key" flat disabled solo-inverted />
          </v-flex>
          <v-flex sm6>
            <v-text-field v-model="api.params[key]" solo flat clearable />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-btn
          :loading="loading"
          :disabled="!api"
          large
          block
          color="secondary"
          @click.native="postRequest"
          >请求</v-btn
        >
        <v-alert
          :value="Boolean(message)"
          type="info"
          transition="scale-transition"
          v-text="message"
        />
      </v-flex>
      <v-flex xs12 pt-3>
        <v-alert
          :value="Boolean(result)"
          type="info"
          transition="scale-transition"
          v-text="result"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  const { session } = require("electron").remote;

  export default {
    data: () => ({
      message: null,
      result: null,
      loading: false,
      access_token: null,
      api: null
    }),
    computed: {
      apis() {
        return [
          {
            header: "●云函数"
          },
          {
            name: "触发云函数",
            api: "/tcb/invokecloudfunction",
            params: {
              env: "",
              name: "",
              POSTBODY: ""
            }
          },
          {
            divider: true
          },
          {
            header: "●数据库"
          },
          {
            name: "导入",
            api: "/tcb/databasemigrateimport",
            params: {
              env: "",
              collection_name: "",
              file_path: "",
              file_type: "",
              stop_on_error: "",
              conflict_mode: ""
            }
          },
          {
            name: "导出",
            api: "/tcb/databasemigrateexport",
            params: { env: "", file_path: "", file_type: "", query: "" }
          },
          {
            name: "迁移状态查询",
            api: "/tcb/databasemigratequeryinfo",
            params: { env: "", job_id: "" }
          },
          {
            name: "更新索引",
            api: "/tcb/updateindex",
            params: {
              env: "",
              collection_name: "",
              create_indexes: "",
              drop_indexes: ""
            }
          },
          {
            name: "新增集合",
            api: "/tcb/databasecollectionadd",
            params: {
              env: "",
              collection_name: ""
            }
          },
          {
            name: "删除集合",
            api: "/tcb/databasecollectiondelete",
            params: {
              env: "",
              collection_name: ""
            }
          },
          {
            name: "获取集合信息",
            api: "/tcb/databasecollectionget",
            params: {
              env: "",
              limit: 10,
              offset: 0
            }
          },
          {
            name: "插入记录",
            api: "/tcb/databaseadd",
            params: {
              env: "",
              query: ""
            }
          },
          {
            name: "删除记录",
            api: "/tcb/databasedelete",
            params: {
              env: "",
              query: ""
            }
          },
          {
            name: "更新记录",
            api: "/tcb/databaseupdate",
            params: {
              env: "",
              query: ""
            }
          },
          {
            name: "查询记录",
            api: "/tcb/databasequery",
            params: {
              env: "",
              query: ""
            }
          },
          {
            name: "集合",
            api: "/tcb/databaseaggregate",
            params: {
              env: "",
              query: ""
            }
          },
          {
            name: "统计记录数量",
            api: "/tcb/databasecount",
            params: {
              env: "",
              query: ""
            }
          },
          {
            divider: true
          },
          {
            header: "●云存储"
          },
          {
            name: "上传文件",
            api: "/tcb/uploadfile",
            params: {
              env: "",
              path: ""
            }
          },
          {
            name: "下载文件",
            api: "/tcb/batchdownloadfile",
            params: {
              env: "",
              file_list: ""
            }
          },
          {
            name: "删除文件",
            api: "/tcb/batchdeletefile",
            params: {
              env: "",
              file_list: ""
            }
          },
          {
            divider: true
          },
          {
            header: "●其他"
          },
          {
            name: "获取腾讯云API调用凭证",
            api: "/tcb/getqcloudtoken",
            params: {
              lifespan: 7200
            }
          }
        ];
      }
    },
    methods: {
      // 获取cookies
      getCookie(name) {
        session.defaultSession.cookies.get(
          { url: this.$store.state.baseUrl },
          (error, cookies) => {
            if (error) console.error(error);
            const accessToken = cookies.find(cookie => cookie.name === name);
            if (accessToken) {
              this.access_token = accessToken.value;
              this.$store.commit("setAccessToken", accessToken.value);
            } else {
              this.$store.commit("setAccessToken", null);
              this.$router.push({ name: "login" });
            }
          }
        );
      },
      postRequest() {
        fetch(
          `${this.$store.state.baseUrl}${this.api.api}?access_token=${this.access_token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...this.api.params,
              env: this.$store.state.env
            })
          }
        )
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.result = data;
          });
      }
    },
    mounted() {
      this.getCookie("access_token");
    }
  };
</script>
