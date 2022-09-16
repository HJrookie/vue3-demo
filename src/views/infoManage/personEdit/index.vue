<template>
  <div class="personInfo">
    <el-form ref="form" :model="form" :rules="rules" label-width="115px" label-position="right" class="personForm" size="small" v-loading="loading">
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="11">
              <el-form-item prop="name" label="姓名" label-width="115px">
                <el-input v-model="form.name" placeholder="请输入姓名" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="name" label="性别" label-width="80px">
                <el-select v-model="form.sex" placeholder="请选择性别" filterable clearable style="width: 100%">
                  <el-option v-for="item in dicts.sex" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item prop="age" label="年龄" label-width="115px">
                <el-input-number v-model="form.age" placeholder="请输入年龄" style="width: 100%" :min="1" :max="100"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="nation" label="民族" label-width="80px">
                <el-select v-model="form.nation" placeholder="请选择民族" filterable clearable style="width: 100%">
                  <el-option v-for="item in dicts.nations" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item prop="phone" label="手机号" label-width="115px">
                <el-input v-model="form.phone" placeholder="请输入手机号" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="email" label="邮箱" label-width="80px">
                <el-input v-model="form.email" placeholder="请输入邮箱" clearable style="width: 100%" disabled />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="22">
              <el-form-item prop="idNumber" label="身份证号" label-width="115px">
                <el-input v-model="form.idNumber" placeholder="请输入身份证号" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <!--          头像框-->
          <el-form-item label-width="8px" prop="pic1" class="userAvatar">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="headers"
              list-type="picture-card"
              :on-success="avatarSuccessHandle"
              :show-file-list="false"
              accept="image/*"
            >
              <template v-if="avatarInfo.imgUrl">
                <img class="el-upload-list__item-thumbnail avatar" :src="avatarInfo.imgUrl" alt="111" />
                <span v-if="avatarInfo.imgUrl" class="el-upload-action">
                  <i class="el-icon-zoom-in" style="margin-right: 5px" @click.stop="handlePictureCardPreview(avatarInfo.imgUrl)"></i>
                  <i class="el-icon-delete" @click.stop="handleAvatarRemove()"></i>
                </span>
              </template>

              <template v-else>
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </template>
              <div class="el-upload__text">请上传免冠 1.5 寸彩色近照</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label-width="8px" prop="idCardOne">
            <el-upload :action="uploadUrl" :headers="headers" drag :on-success="idCard1SuccessHandle" :show-file-list="false" accept="image/*">
              <template v-if="idCardOne.imgUrl">
                <img class="el-upload-list__item-thumbnail id-card" :src="idCardOne.imgUrl" alt="身份证正面图" />
                <span class="upload-acton-idcard">
                  <i class="el-icon-zoom-in" style="margin-right: 10px" @click.stop="handlePictureCardPreview(idCardOne.imgUrl)"></i>
                  <i class="el-icon-delete" @click.stop="handleIdCard1Remove()"></i>
                </span>
              </template>
              <template v-else>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">请上传身份证正面图片</div>
              </template>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="8px" prop="idCardTwo">
            <el-upload :action="uploadUrl" :headers="headers" drag :on-success="idCard2SuccessHandle" :show-file-list="false" accept="image/*">
              <template v-if="idCardTwo.imgUrl">
                <img class="el-upload-list__item-thumbnail id-card" :src="idCardTwo.imgUrl" alt="身份证反面图" />
                <span class="upload-acton-idcard">
                  <i class="el-icon-zoom-in" style="margin-right: 10px" @click.stop="handlePictureCardPreview(idCardTwo.imgUrl)"></i>
                  <i class="el-icon-delete" @click.stop="handleIdCard2Remove()"></i>
                </span>
              </template>
              <template v-else>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">请上传身份证反面图片</div>
              </template>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="zzmm" label="政治面貌" label-width="115px">
            <el-input v-model="form.zzmm" placeholder="请输入政治面貌" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="edu" label="文化程度" label-width="115px">
            <el-input v-model="form.edu" placeholder="请输入文化程度" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="job" label="现从事职业" label-width="115px">
            <el-input v-model="form.job" placeholder="请输入现从事职业" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="jobLevel" label="职称" label-width="115px">
            <el-input v-model="form.jobLevel" placeholder="请输入职称" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="institution" label="所属单位" label-width="115px">
            <el-input v-model="form.institution" placeholder="请输入所属单位" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="institutionPhone" label="单位手机号" label-width="115px">
            <el-input v-model="form.institutionPhone" placeholder="请输入单位手机号" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="ldName" label="领队姓名" label-width="115px">
            <el-input v-model="form.ldName" placeholder="请输入领队姓名" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="ldPhone" label="领队手机号" label-width="115px">
            <el-input v-model="form.ldPhone" placeholder="请输入领队手机号" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="t1" label="指导教师一" label-width="115px">
            <el-input v-model="form.t1" placeholder="请输入指导教师一" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="t2" label="指导教师二" label-width="115px">
            <el-input v-model="form.t2" placeholder="请输入指导教师二" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="separator"></div>

      <el-row>
        <el-form-item prop="jobZige" label="职业资格及等级" label-width="115px">
          <el-input v-model="form.jobZige" placeholder="请输入职业资格及等级" clearable maxlength="20" />
        </el-form-item>
      </el-row>

      <el-form-item prop="registeredResidence" label="户籍所在地">
        <el-input v-model="form.registeredResidence" placeholder="请输入户籍所在地" maxlength="100" clearable />
      </el-form-item>
      <el-form-item prop="history" label="个人简历">
        <el-input v-model="form.history" placeholder="请输入个人简历" :rows="5" type="textarea" maxlength="1000"></el-input>
      </el-form-item>

      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" @click="save">保存 </el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <!--  图片预览  -->
    <el-dialog title="图片预览" width="800px" :visible.sync="previewVisible" append-to-body :before-close="resetImgData">
      <img :src="previewUrl" class="preview-img" alt="图片预览" />
    </el-dialog>
  </div>
</template>

<script>
import { getCurUserInfo, getPersionalInfo, savePersonalInfo, savePersonInfo } from "@/api/user";
import { mapGetters } from "vuex";
import { isMobile } from "@/utils/validate";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { getFileInfoById } from "@/api/contestManage";

export default {
  name: "PersonEdit",
  components: {
    // AddOrUpdate,
  },
  created() {
    this.init();
  },
  data() {
    const validPhone = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const validPhone2 = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (!isMobile(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    };

    const validIdCard = (rule, value, callback) => {
      if (!value || value.length !== 18) {
        callback(new Error("请输入正确的身份证号"));
      } else {
        callback();
      }
    };

    const validIdCard1 = (rule, value, callback) => {
      const v = this.idCardOne.imgId;
      if (!v) {
        callback(new Error("请上传身份证正面图片"));
      } else {
        callback();
      }
    };

    const validIdCard2 = (rule, value, callback) => {
      const v = this.idCardTwo.imgId;
      if (!v) {
        callback(new Error("请上传身份证反面图片"));
      } else {
        callback();
      }
    };

    return {
      previewVisible: false,
      // 上传文件 时需要的header
      headers: {
        // Authorization: "Bearer " + getToken(),
      },
      uploadUrl: process.env.VUE_APP_BASE_API + "/system/file/pool",
      // 头像照片信息
      avatarInfo: {
        imgUrl: "",
        imgId: undefined,
      },
      previewUrl: "",
      form: {
        name: "", //
        sex: undefined,
        pic1: undefined, // 头像照片
        age: undefined, //
        nation: undefined, // 民族
        phone: undefined, //
        idNumber: undefined, // 身份证号
        zzmm: undefined, // 政治面貌
        //todo  图片显示

        email: undefined, //
        edu: undefined, //  教育
        job: undefined, //  // 职业
        jobLevel: undefined, //    职称
        jobZige: undefined, // 资格和等级
        professionInfo: {
          value: undefined,
          files: [],
        },
        institution: undefined, // 所属单位
        institutionPhone: undefined,
        ldName: undefined, // 领队姓名
        ldPhone: undefined,
        t1: undefined, // 教师 1
        t2: undefined,
        registeredResidence: undefined, // 户籍所在地
        history: undefined, // 个人简历
      },
      idCardOne: {
        imgUrl: "",
        imgId: undefined,
      },
      idCardTwo: {
        imgUrl: "",
        imgId: undefined,
      },
      rules: {
        name: [{ required: false, trigger: "blur", message: "请输入姓名" }],
        sex: [{ required: false, trigger: "change", message: "请选择性别" }],
        age: [{ required: true, trigger: "change", message: "请输入年龄" }],
        pic1: [{ required: false, trigger: "change", message: "请上传免冠照片" }],
        nation: [{ required: false, trigger: "change", message: "请选择民族" }],
        idNumber: [{ required: true, trigger: "change", message: "请输入身份证号", validator: validIdCard }],
        email: [{ required: false, trigger: "blur", message: "请输入邮箱" }],
        phone: [{ required: true, trigger: "change", message: "请输入手机号", validator: validPhone }],
        institutionPhone: [{ required: false, trigger: "change", validator: validPhone2 }],
        ldPhone: [{ required: false, trigger: "change", validator: validPhone2 }],
        idCardOne: [{ required: true, trigger: "blur", message: "请上传身份证正面图片", validator: validIdCard1 }],
        idCardTwo: [{ required: true, trigger: "blur", message: "请上传身份证反面图片", validator: validIdCard2 }],
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["dicts"]),
  },
  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const formData = { ...this.form };
          const data = {
            name: formData.name,
            sex: formData.sex, // 男 1, 女 2
            age: formData.age,
            nation: formData.nation,
            phonenumber: formData.phone?.trim(),
            email: formData.email?.trim(),
            idCard: formData.idNumber?.trim(), //身份证号
            politicsStatus: formData.zzmm?.trim(), // 政治面貌

            // todo 身份证正反面  头像
            occupation: formData.job?.trim(), // 职业
            professionalLevel: formData.jobLevel?.trim(), // 职称
            company: formData.institution?.trim(), //所属单位
            education: formData.edu?.trim(), // 文化程度
            occupationalLevel: formData.jobZige?.trim(), // 资格和等级
            registerAddr: formData.registeredResidence?.trim(), // 户籍所在地
            experience: formData.history?.trim(), // 个人简历
            photoAddr: this.avatarInfo.imgId ?? 0, // 个人头像图片 (如果没图片,就传0, 然后获取到的数据也是0 )
            idCardOne: this.idCardOne.imgId ?? 0, //身份证正面
            idCardTwo: this.idCardTwo.imgId ?? 0, //身份证反面

            academicAdvisorOne: this.form.t1, // 指导教师 1
            academicAdvisorTwo: this.form.t2,
            leadName: this.form.ldName, // 领队姓名
            leadPhone: this.form.ldPhone,
            companyPhone: this.form.institutionPhone, // 单位手机号
          };
          savePersonalInfo(data)
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
    init() {
      this.loading = true;
      getCurUserInfo()
        .then((res) => {
          l(4444, res);
          this.loading = false;
          const { data = {} } = res ?? {};
          this.form = {
            name: data?.name ?? undefined,
            phone: data?.phonenumber ?? undefined,
            sex: data?.sex === 0 ? undefined : data?.sex, // 0 代表没维护
            email: data?.email,
            age: data?.age ?? undefined,

            idNumber: data?.idCard, // 身份证号
            nation: data?.nation, // 民族
            job: data?.occupation, // 职业
            jobLevel: data?.professionalLevel, // 职称
            jobZige: data?.occupationalLevel, // 资格和等级
            institution: data?.company, // 所属单位
            edu: data?.education, // 文化程度
            zzmm: data?.politicsStatus, // 政治面貌
            registeredResidence: data?.registerAddr, // 户籍所在地
            history: data?.experience, // 个人简历
            t1: data?.academicAdvisorOne ?? undefined, // 指导教师
            t2: data?.academicAdvisorTwo ?? undefined,
            ldName: data?.leadName ?? undefined, // 领队姓名
            ldPhone: data?.leadPhone ?? undefined,
            institutionPhone: data?.companyPhone ?? undefined, // 单位手机号
          };

          // 初始化 用户头像
          if (data?.photoAddr) {
            getFileInfoById(data?.photoAddr)
              .then((res) => {
                this.avatarInfo.imgUrl = getImgUrl(res?.data?.filePath ?? "");
                this.avatarInfo.imgId = res?.data?.id ?? undefined;
              })
              .catch((err) => {});
          }
          // 初始化身份证
          if (data?.idCardOne) {
            getFileInfoById(data?.idCardOne)
              .then((res) => {
                this.idCardOne.imgUrl = getImgUrl(res?.data?.filePath ?? "");
                this.idCardOne.imgId = res?.data?.id ?? undefined;
              })
              .catch((err) => {});
          }

          if (data?.idCardTwo) {
            getFileInfoById(data?.idCardTwo)
              .then((res) => {
                this.idCardTwo.imgUrl = getImgUrl(res?.data?.filePath ?? "");
                this.idCardTwo.imgId = res?.data?.id ?? undefined;
              })
              .catch((err) => {});
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    avatarSuccessHandle(response, file, fileList) {
      // l("success", response, file, fileList);
      this.avatarInfo.imgUrl = getImgUrl(response?.filePath);
      this.avatarInfo.imgId = response?.id;
    },
    idCard1SuccessHandle(response) {
      this.idCardOne.imgUrl = getImgUrl(response?.filePath);
      this.idCardOne.imgId = response?.id;
      this.$refs.form.validateField("idCardOne", (errorMessage) => {
        return "请上传身份证正面图片";
      });
    },
    idCard2SuccessHandle(response) {
      this.idCardTwo.imgUrl = getImgUrl(response?.filePath);
      this.idCardTwo.imgId = response?.id;
      this.$refs.form.validateField("idCardTwo", (errorMessage) => {
        return "请上传身份证反面图片";
      });
    },
    // 暂时不支持下载图标
    handleImgsDownload(f) {
      const url = "/report/single/file/" + f.fileId;
      download({ url, method: "get", responseType: "blob", headers: { JSESSIONID: getToken() } });
    },
    handleIdCard1Remove() {
      this.idCardOne.imgUrl = "";
      this.idCardOne.imgId = undefined;
    },
    handleIdCard2Remove() {
      this.idCardTwo.imgUrl = "";
      this.idCardTwo.imgId = undefined;
    },
    handleAvatarRemove() {
      this.avatarInfo.imgUrl = "";
      this.avatarInfo.imgId = undefined;
    },
    handlePictureCardPreview(url) {
      this.previewUrl = url;
      this.previewVisible = true;
    },
    resetImgData() {
      this.previewVisible = false;
      this.previewUrl = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.personInfo {
  max-width: 80%;
  width: 800px;
  margin: 0 auto;
  .personForm {
    width: 100%;
    padding: 20px;
  }
}
.preview-img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
}
.separator {
  width: 100%;
  height: 1px;
  background-color: #80808047;
  margin: 20px 0;
}
.userAvatar {
  ::v-deep {
    .el-upload--picture-card {
      height: 120px;
      width: 120px;
      line-height: 128px;
      .el-upload__text {
        line-height: 1.2;
        font-size: 12px;
        color: #646262e3;
        text-align: left;
        position: absolute;
        top: 130px;
        width: 120px;
      }
    }
  }
}

.avatar {
  max-width: 118px;
  /* height: 100%; */
  max-height: 118px;
}
.id-card {
  max-width: 100%;
  max-height: 100%;
}

.el-upload-action {
  position: absolute;
  top: 0;
  /* bottom: 0; */
  left: 0;
  display: block;
  width: 120px;
  height: 120px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 120px;
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
    font-size: 16px;
    visibility: hidden;
  }
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
    font-size: 16px;
    visibility: hidden;
  }
}

.card-uploader {
}
</style>
