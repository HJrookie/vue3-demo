<template>
  <div class="instiEdit">
    <div class="query-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="name" label="单位全称">
              <el-input v-model="form.fullName" placeholder="请输入单位全称" clearable />
            </el-form-item>
            <el-form-item prop="certType" label="证件类型">
              <el-select :value="form.certType" @input="handleCertTypeChange" placeholder="请选择证件类型" filterable clearable style="width: 100%">
                <el-option v-for="item in dicts.institutionCertTypes" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item prop="idCard" label="证件号">
              <el-input v-model="form.idCard" placeholder="请输入证件号" clearable />
            </el-form-item>

            <el-form-item prop="phone" label="手机号">
              <el-input v-model="form.phone" placeholder="请输入手机号" clearable />
            </el-form-item>

            <el-form-item prop="email" label="邮箱">
              <el-input v-model="form.email" placeholder="请输入邮箱" clearable disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="yingyezhizhao">
              <el-upload :action="uploadUrl" :headers="headers" drag :on-success="avatarSuccessHandle" :show-file-list="false" accept="image/*">
                <template v-if="imgInfo.imgUrl">
                  <img class="el-upload-list__item-thumbnail avatar" :src="imgInfo.imgUrl" alt="对应的证件图片" />
                  <span class="upload-acton-idcard">
                    <i class="el-icon-zoom-in" style="margin-right: 10px" @click.stop="handlePictureCardPreview(imgInfo.imgUrl)"></i>
                    <i class="el-icon-delete" @click.stop="handleAvatarRemove()"></i>
                  </span>
                </template>
                <template v-else>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">请上传对应的证件图片</div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-button type="primary" @click="save" size="mini">保存 </el-button>
        </el-row>
      </el-form>
    </div>
    <!--  图片预览  -->
    <el-dialog title="图片预览" width="800px" :visible.sync="previewVisible" append-to-body :before-close="resetImgData">
      <img :src="previewUrl" class="preview-img" alt="图片预览" />
    </el-dialog>
  </div>
</template>

<script>
import { getCurUserInfo, savePersonalInfo, getInstitutionInfo, saveCsInfo, saveInstitutionInfo } from "@/api/user";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { getFileInfoById } from "@/api/contestManage";
import { isMobile } from "@/utils/validate";

export default {
  name: "InstiEdit",
  components: {
    // AddOrUpdate,
  },
  computed: {
    ...mapGetters(["dicts"]),
  },
  created() {
    // 获取用户数据 初始化 form2
    this.init();
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value || !value.trim().length || !isMobile(value)) {
        callback(new Error("请输入有效的手机号"));
      } else {
        callback();
      }
    };

    const validImg = (rule, value, callback) => {
      if (!this.imgInfo.imgUrl) {
        callback(new Error("请上传对应的证件照片"));
      } else {
        callback();
      }
    };

    return {
      form: {
        fullName: undefined, //
        certType: undefined,
        phone: undefined,
        idCard: undefined, //证件号
        email: undefined, //
      },
      previewVisible: false,
      previewUrl: "",
      // 上传文件 时需要的header
      headers: {
        // Authorization: "Bearer " + getToken(),
      },
      uploadUrl: process.env.VUE_APP_BASE_API + "/system/file/pool",
      imgInfo: {
        imgUrl: "",
        imgId: undefined,
      },
      rules: {
        fullName: [{ required: true, message: "请输入单位全称", trigger: "blur" }],
        // certNum: [{ required: true, message: "请输入证件号码", trigger: "blur" }],
        yingyezhizhao: [{ required: true, trigger: "change", validator: validImg }],
        phone: [{ required: true, message: "请输入有效的手机号", trigger: "change", validator: validatePhone }],
        idCard: [{ required: true, message: "请输入证件号", trigger: "change" }],
      },
      loading: false,
    };
  },
  methods: {
    init() {
      this.loading = true;
      getCurUserInfo()
        .then((res) => {
          this.loading = false;
          const { data = {} } = res || {};
          this.form = {
            fullName: data?.name ?? undefined,
            certType: data?.cardType ?? undefined,
            phone: data?.phonenumber ?? undefined,
            email: data?.email ?? undefined,
            idCard: data?.idCard ?? undefined,
          };

          if (data?.idCardOne) {
            getFileInfoById(data?.idCardOne)
              .then((res) => {
                this.imgInfo.imgUrl = getImgUrl(res?.data?.filePath ?? "");
                this.imgInfo.imgId = res?.data?.id ?? undefined;
              })
              .catch((err) => {});
          }
        })
        .catch((rr) => {
          this.loading = false;
        });
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const formData = { ...this.form };
          const data = {
            name: formData.fullName, // 名称
            cardType: formData.certType, // 证件类型
            idCardOne: this.imgInfo.imgId ? this.imgInfo.imgId : 0, // 证件文件的 id
            idCard: this.form.idCard,
            phonenumber: formData.phone?.trim(), // 手机号
          };
          saveCsInfo(data)
            .then((res) => {
              this.$message.success("保存成功");
              this.init();
            })
            .catch((err) => {
              // this.$message.error("保存失败,请重试");
              this.init();
            });
        }
      });
    },
    handleCertTypeChange(v) {
      this.form.certType = v;
    },
    handlePictureCardPreview(url) {
      this.previewUrl = url;
      this.previewVisible = true;
    },
    handleAvatarRemove() {
      this.imgInfo.imgUrl = "";
      this.imgInfo.imgId = undefined;
    },
    resetImgData() {
      this.previewVisible = false;
      this.previewUrl = "";
    },
    avatarSuccessHandle(response, file, fileList) {
      this.imgInfo.imgUrl = getImgUrl(response?.filePath);
      this.imgInfo.imgId = response?.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.instiEdit {
  .query-form {
  }
}
.preview-img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
}
.avatar {
  max-width: 100%;
  max-height: 100%;
}

.upload-acton-idcard {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 178px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #00000029;

    i {
      visibility: visible;
      color: #ffffffd4;
    }
  }

  i {
    font-size: 18px;
    visibility: hidden;
  }
}
</style>
