
/**
 * cyberwin_skills_livelihoodadministrativereviewTemplate
 * Skill Core 核心引擎
 * 能力：口语模糊匹配 + 标准术语替换 + 部门法条自动绑定 + 模板渲染
 * 零前端依赖、纯AI Skill逻辑、适配行政复议/履职双模板
 */

// 引入外部民生映射库
import { civilMapping } from './civil-mapping.js';

const SkillCore = {
  /**
   * 1. 核心匹配：用户口语文本 => 标准政务数据
   * @param {string} userInput 用户口语描述（拆迁、准生证、城管罚款等）
   * @returns {object|null} 匹配到的标准事项对象
   */
  matchAffair(userInput) {
    if (!userInput || userInput.trim() === '') return null;
    const input = userInput.trim().toLowerCase();

    // 优先级：alias民间别名模糊匹配
    for (const item of civilMapping) {
      const aliasList = item.alias.map(a => a.toLowerCase());
      for (const keyword of aliasList) {
        if (input.includes(keyword)) {
          return item;
        }
      }
    }
    return null;
  },

  /**
   * 2. 判断文书类型：自动区分 复议 / 履职
   * @param {string} userInput 用户描述
   * @returns {string} reconsideration / supervision
   */
  getDocType(userInput) {
    const reconsiderationKeys = ['不服', '罚款', '处罚', '驳回', '不予受理', '认定错误', '不合理'];
    const supervisionKeys = ['不处理', '不答复', '拖延', '不作为', '推诿', '没人管', '超期'];

    const input = userInput.toLowerCase();

    // 有异议、不服 = 行政复议
    for (let k of reconsiderationKeys) {
      if (input.includes(k)) return 'reconsideration';
    }
    // 不做事、不答复 = 履职监督
    for (let k of supervisionKeys) {
      if (input.includes(k)) return 'supervision';
    }

    // 默认兜底：不作为优先履职
    return 'supervision';
  },

  /**
   * 3. 模板变量渲染
   * @param {string} template 原始模板文本
   * @param {object} data 匹配到的标准事项数据
   * @returns {string} 渲染完成文书
   */
  renderTemplate(template, data) {
    if (!data) return '【未匹配到对应民生事项，请规范描述您的问题】';

    let result = template;
    result = result.replace(/{{stand}}/g, data.stand);
    result = result.replace(/{{depart}}/g, data.depart);
    result = result.replace(/{{lawBase}}/g, data.lawBase);
    
    return result;
  },

  /**
   * 4. 一键生成最终文书（对外统一入口）
   * @param {string} userInput 用户口语问题
   * @param {string} template 对应md模板原文
   * @returns {string} 最终正式文书
   */
  generate(userInput, template) {
    const matchData = this.matchAffair(userInput);
    return this.renderTemplate(template, matchData);
  }
};

export default SkillCore;
