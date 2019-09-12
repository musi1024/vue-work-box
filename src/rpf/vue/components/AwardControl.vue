
<!-- 
一 、 操作方式及相关参数解析
1、点击操作-修改，列表变成可编辑状态,可编辑状态可以修改‘概率分子’、‘人工干预’、‘人工干预数量’。
2、概率分子rate：可编辑，接受0~无限大的数字
3、概率分母denominator：概率分母=有效的概率分子之和
4、无效概率分子：	满足一下任意条件即为无效概率分子，其余情况视为有效分子
     1、概率分子为0
     2、人工干预开启且干预数量为0
     3、奖品剩余数量为0
4、中奖概率probability：
      1、有效分子/分母，保持两位小数点
      2、无效概率分子项的概率为0
5、所有的概率相加等于100%
6、人工干预is_manual：可编辑，switch 开关,开启时为人工干预状态。
7、人工干预数量manual_amount：可编辑，接受最小为0的数字，必须大于等于剩余数量。
8、人工干预开启时，奖品只会按照人工干预的数量发放，不会超发;人工干预数量发完，可以重新设置。
9、奖品剩余数量rest_amount 
--> 

<template>
  <section>
    <el-table :data="tableData">
      <el-table-column
        label="奖品ID"
        min-width="50"
        prop="award_id"
        align="center"
      ></el-table-column>
      <el-table-column
        label="奖品名称"
        min-width="50"
        prop="name"
        align="center"
      ></el-table-column>
      <slot></slot>
      <el-table-column
        label="剩余数量"
        prop="rest_amount"
        min-width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="概率分母" min-width="50" align="center">
        <template>
          {{ denominator }}
        </template>
      </el-table-column>

      <el-table-column label="概率分子" min-width="50" align="center">
        <template slot-scope="prop">
          <span v-if="!prop.row.is_modify">
            {{ prop.row.rate }}
          </span>
          <el-input
            v-else
            v-model.number="prop.row.rate"
            @input="validate(prop.$index)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="中奖概率" min-width="50" align="center">
        <template slot-scope="prop">
          <span>
            {{ probabilityArray[prop.$index] + '%' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="人工干预" min-width="50" align="center">
        <template slot-scope="prop">
          <el-switch
            v-model="prop.row.is_manual"
            :active-value="1"
            :inactive-value="0"
            :disabled="!prop.row.is_modify"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="人工干预数量" min-width="50" align="center">
        <template slot-scope="prop">
          <span v-if="!prop.row.is_modify">{{ prop.row.manual_amount }}</span>
          <el-input
            v-else
            v-model.number="prop.row.manual_amount"
            @input="validate(prop.$index)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="100"
        align="center"
        fixed="right"
      >
        <template slot-scope="prop">
          <el-button v-if="!prop.row.is_modify" @click="modify(prop.$index)">
            修改
          </el-button>
          <el-button type="primary" v-else @click="ensure(prop.$index)">
            确定
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  props: {
    tableData: {
      default: [],
      required: true
    }
  },
  data() {
    return {};
  },
  watch: {
    tableData: {
      immediate: true,
      handler: 'validataTableData'
    }
  },
  computed: {
    // 概率分母
    denominator() {
      return this.tableData.reduce((accumulator, item) => {
        let rate;
        if (
          (item.is_manual === 1 && item.manual_amount === 0) ||
          item.rest_amount <= 0
        ) {
          /**
           1、人工干预开启且人工干预数量为0时
           2、奖品剩余数量为0时
           以上2种情况，不会抽到奖品，返回0
          */

          rate = 0;
        } else {
          rate = item.rate;
        }

        // 概率分子叠加，总和为概率分母
        return (accumulator += rate);
      }, 0);
    },

    /**
     *@type {Array}
     *@summary 每项代表每个奖品的中奖概率
     */
    probabilityArray() {
      return this.tableData.map(item => {
        if (this.denominator === 0) {
          // 概率分母为0时，每个奖品的中奖概率为0

          return 0;
        }

        if (
          this.denominator === 0 ||
          item.rate === 0 ||
          (item.is_manual === 1 && item.manual_amount === 0) ||
          item.rest_amount <= 0
        ) {
          /**
           * 1、概率分子为0
           * 2、人工干预且干预数量为0
           * 3、奖品剩余数量为0
           * 以上3种情况，此奖品的中奖概率为0
           */

          return 0;
        } else {
          // 计算中奖概率

          return ((item.rate / this.denominator) * 100).toFixed(2);
        }
      });
    }
  },
  methods: {
    modify(index) {
      this.tableData[index].is_modify = 1;
    },
    ensure(index) {
      this.tableData[index].is_modify = 0;
      let { award_id, rate, manual_amount, is_manual } = this.tableData[index];
      let data = {
        award_id,
        rate,
        manual_amount,
        is_manual
      };
      this.$emit('change', data);
    },
    validate(index) {
      if (this.tableData[index].rate <= 0) {
        this.$set(this.tableData[index], 'rate', 0);
      }
      if (this.tableData[index].manual_amount <= 0) {
        this.$set(this.tableData[index], 'manual_amount', 0);
      }
      if (
        this.tableData[index].manual_amount > this.tableData[index].rest_amount
      ) {
        this.$set(this.tableData[index], 'manual_amount', 0);
        this.$message('人工干预数量不能大于剩余数量');
      }
    },
    validataTableData(tableData) {
      //数据必须包含的字段
      let requiredParams = [
        'award_id',
        'rate',
        'is_manual',
        'manual_amount',
        'rest_amount'
      ];
      let missingParams; //缺少的参数名
      let errorIndex = tableData.findIndex(item => {
        let keyArray = Object.keys(item);
        for (let i = 0; i < requiredParams.length; i++) {
          if (!keyArray.includes(requiredParams[i])) {
            missingParams = requiredParams[i];
            return true;
          }
        }
      });
      if (errorIndex > -1) {
        throw new Error(`第${errorIndex}项目缺少参数：${missingParams}`);
      }
      this.adapter();
    },
    adapter() {
      this.tableData.map(item => {
        //添加状态字段
        this.$set(item, 'is_modify', 0);
        return item;
      });
    }
  }
};
</script>
