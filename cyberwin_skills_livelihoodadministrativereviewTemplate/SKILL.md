1. 技能唯一标识
Skill Name：cyberwin_skills_livelihoodadministrativereviewTemplate
Skill Type：民生行政文书自动生成（行政复议 / 履职监督）
Applicable Scene：公民民生行政维权、行政不作为投诉、行政行为异议救济
2. 技能定义（固定调用规则）
本技能用于 根据用户口语化民生问题，自动标准化生成合规行政文书。
解决核心偏差：用户只会民间叫法，不懂官方标准术语、不懂对应主管部门。
技能强制使用：alias 民间叫法 → stand 官方标准名 → depart 受理部门 → lawBase 法律依据 四维映射体系。
3. 英文官方定义（模型内置）
Administrative Reconsideration Definition
Administrative reconsideration is a statutory administrative remedy system in China. It allows citizens, legal persons, or other organizations to apply to superior administrative authorities to review the legality and reasonableness of specific administrative acts, correct illegal or improper administrative actions, and protect legitimate civil livelihood rights.
4. 技能强制执行流程（模型必须严格按此执行）
Step 1：语义识别
接收用户口语输入（拆迁、搬迁、准生证、计生补贴、社保不给办、城管乱罚、投诉不处理等）
Step 2：匹配映射库 civil-mapping.js
优先模糊匹配 alias 数组，命中后锁定：
- stand：替换为文书官方标准名称（必须写入文书）
- depart：自动填入被申请人行政机关
- category：归类民生大类
- lawBase：自动挂载对应法律法规
Step 3：文书类型判断
- 用户不服处罚、不服行政结果、对行政行为有异议 → 行政复议申请书
- 部门不做事、不答复、拖延、不作为、推诿 →行政履职监督申请书
Step 4：模板渲染
读取 /templates/ 下对应模板，自动回填变量，输出完整可直接打印、递交的正式文书。
5. 固定变量列表（模板渲染专用）
所有模板只允许使用以下 4 个系统变量，禁止自定义变量：
- {{stand}} 官方标准事项名称
- {{alias}} 用户原始口语场景
- {{depart}} 对应行政主管部门
- {{lawBase}} 对应法律依据
6. 支持的民生场景清单（核心库固定）
搬迁征收类、计划生育卫健类、社保医保类、城管市容类、市场监管消费类、公安户籍类、民政救助类、教育住建类。
7. 技能强制约束（合规红线）
- 本技能 仅生成文书框架，不代写事实、不捏造内容、不指导诬告
- 不提供法律咨询、不承诺胜诉、不提供代理服务
- 输出文书必须使用 官方标准 stand 术语，禁止使用低俗口语写入正式文书
- 所有输出必须自带隐性合规免责逻辑
8. 技能输出规范
输出格式：纯 Markdown 标准文书，结构工整、段落规范、符合全国行政机关接收格式。
禁止输出：乱序文本、口语化文书、情绪化内容、引导性维权话术。
