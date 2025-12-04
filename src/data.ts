import type { FoodItem } from './types';
import { TimeOfDay } from './utils/timeUtils';

/**
 * 美食数据 - 严格按时间段分类
 * 分类原则：
 * - 早餐：专门为早晨设计的食物，清淡、易消化
 * - 午餐：适合中午的正餐，营养均衡
 * - 下午茶：轻食、甜品、饮品，适合下午补充能量
 * - 晚餐：丰盛的正餐，适合晚上聚餐
 * - 宵夜：夜宵特色，重口味、易制作
 * - 全天：任何时间都适合的食物
 */
export const FOOD_DATA: FoodItem[] = [
  // === 早餐 (6:00-11:00) - 专门为早晨设计 ===
  { id: 'bf-1', name: '豆浆油条', emoji: '🥖', category: '早餐', description: '油条：我泡在豆浆里，这就是我的一生追求！', color: 'bg-amber-50 text-amber-600 border-amber-200', timeOfDay: [TimeOfDay.MORNING] },
  { id: 'bf-2', name: '包子', emoji: '🥟', category: '早餐', description: '白白胖胖的小包子，一口咬下去都是汁水！', color: 'bg-stone-100 text-stone-600 border-stone-200', timeOfDay: [TimeOfDay.MORNING] },
  { id: 'bf-3', name: '煎饼果子', emoji: '🌯', category: '早餐', description: '薄脆：我是煎饼的灵魂，鸡蛋是我的配角，葱花是我的香水！', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', timeOfDay: [TimeOfDay.MORNING] },
  { id: 'bf-4', name: '广式早茶', emoji: '🥘', category: '粤式早餐', description: '一笼笼的小包子小饺子在蒸笼里开派对，等着被你吃掉！', color: 'bg-emerald-50 text-emerald-600 border-emerald-200', timeOfDay: [TimeOfDay.MORNING] },
  { id: 'bf-5', name: '小笼包', emoji: '🥟', category: '江南早餐', description: '皮薄汁多的小笼包，小心烫嘴，每一口都是鲜美的汤汁！', color: 'bg-orange-50 text-orange-600 border-orange-200', timeOfDay: [TimeOfDay.MORNING] },
  { id: 'bf-6', name: '鸡蛋灌饼', emoji: '🫓', category: '早餐', description: '鸡蛋和饼的完美结合，再加根火腿肠，完美！', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', timeOfDay: [TimeOfDay.MORNING] },
  { id: 'bf-7', name: '白粥配咸菜', emoji: '🍚', category: '清淡早餐', description: '简单养胃的组合，妈妈的爱心早餐！', color: 'bg-gray-50 text-gray-600 border-gray-200', timeOfDay: [TimeOfDay.MORNING] },
  { id: 'bf-8', name: '牛奶麦片', emoji: '🥛', category: '西式早餐', description: '健康营养的西式早餐，开启活力一天！', color: 'bg-blue-50 text-blue-600 border-blue-200', timeOfDay: [TimeOfDay.MORNING] },
  { id: 'bf-9', name: '肠粉', emoji: '🍜', category: '粤式早餐', description: '米浆蒸成的薄皮，包裹着虾仁或叉烧，淋上酱油，滑嫩爽口！', color: 'bg-emerald-50 text-emerald-600 border-emerald-200', timeOfDay: [TimeOfDay.MORNING] },
  { id: 'bf-10', name: '猪杂粥', emoji: '🥣', category: '粤式早餐', description: '新鲜的猪杂熬制的粥品，营养丰富，暖心暖胃！', color: 'bg-amber-50 text-amber-600 border-amber-200', timeOfDay: [TimeOfDay.MORNING] },
  { id: 'bf-11', name: '信宜捞粉', emoji: '🍜', category: '粤式早餐', description: '广东信宜特色，爽滑的米粉配上秘制豉油，简单却美味！', color: 'bg-orange-50 text-orange-600 border-orange-200', timeOfDay: [TimeOfDay.MORNING] },

  // === 午餐 (11:00-14:00) - 工作日正餐 ===
  { id: 'lu-1', name: '兰州拉面', emoji: '🍜', category: '面食', description: '面条在师傅手里变魔术，一清二白三红四绿五黄，就是没有女朋友！', color: 'bg-blue-50 text-blue-600 border-blue-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'lu-2', name: '红烧肉', emoji: '🥓', category: '家常菜', description: '肥瘦相间的五花肉在糖色里跳舞，米饭见了都要喊大哥！', color: 'bg-red-50 text-red-700 border-red-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'lu-3', name: '水煮鱼', emoji: '🐟', category: '川菜', description: '鱼在红油里游泳，最后游进了你的胃里，还带着一身麻辣！', color: 'bg-orange-100 text-orange-600 border-orange-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'lu-4', name: '酸菜鱼', emoji: '🐟', category: '川菜', description: '酸菜和鱼的完美联姻，连汤都想打包带走当饮料！', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'lu-5', name: '麻婆豆腐', emoji: '🍛', category: '川菜', description: '豆腐：我本来很清纯，直到遇到了花椒和辣椒，从此走上了不归路！', color: 'bg-red-100 text-red-600 border-red-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'lu-6', name: '宫保鸡丁', emoji: '🥜', category: '川菜', description: '鸡丁和花生米的爱情故事，酸甜辣俱全，花生米总是抢戏！', color: 'bg-orange-50 text-orange-700 border-orange-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'lu-7', name: '煲仔饭', emoji: '🍚', category: '粤式', description: '米饭在砂锅里修炼成仙，锅巴是它的舍利子！', color: 'bg-orange-100 text-orange-700 border-orange-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'lu-8', name: '海南鸡饭', emoji: '🍛', category: '粤式', description: '鸡：我泡了一辈子鸡汤澡，就是为了这碗饭！', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'lu-9', name: '美式汉堡', emoji: '🍔', category: '西式快餐', description: '牛肉饼和芝士的浪漫邂逅，生菜番茄是它们的见证者！', color: 'bg-orange-100 text-orange-600 border-orange-200', timeOfDay: [TimeOfDay.NOON] },
  { id: 'lu-10', name: '沙县小吃', emoji: '🥟', category: '快餐', description: '打工人的精神食粮，拌面扁食蒸饺，便宜又好吃，就是有点上头！', color: 'bg-gray-100 text-gray-600 border-gray-200', timeOfDay: [TimeOfDay.NOON] },
  { id: 'lu-11', name: '武汉热干面', emoji: '🍜', category: '面食', description: '芝麻酱的浓郁，面条的劲道，吃完感觉整个武汉都在我嘴里！', color: 'bg-amber-100 text-amber-700 border-amber-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'lu-12', name: '重庆小面', emoji: '🍜', category: '面食', description: '麻辣鲜香的素面，一碗下去，重庆的雾都变得清晰了！', color: 'bg-red-100 text-red-600 border-red-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },

  // === 下午茶 (14:00-17:00) - 轻食甜品 ===
  { id: 'at-1', name: '奶茶', emoji: '🧋', category: '饮品', description: '没有奶茶的一天是不完整的，珍珠是我的快乐源泉！', color: 'bg-stone-100 text-stone-600 border-stone-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },
  { id: 'at-2', name: '蛋糕甜点', emoji: '🍰', category: '甜品', description: '生活太苦，需要一点甜，卡路里是什么？不知道！', color: 'bg-pink-100 text-pink-600 border-pink-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },
  { id: 'at-3', name: '冰淇淋', emoji: '🍦', category: '甜品', description: '冬天吃冰淇淋是对寒冷的不屑，夏天吃是对夏天的致敬！', color: 'bg-blue-50 text-blue-500 border-blue-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },
  { id: 'at-4', name: '水果捞', emoji: '🥝', category: '甜品', description: '酸奶拌水果，假装很健康，其实糖分超标！', color: 'bg-green-50 text-green-600 border-green-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },
  { id: 'at-5', name: '咖啡', emoji: '☕', category: '饮品', description: '打工人的续命神器，不喝一杯下午就睡着了！', color: 'bg-amber-100 text-amber-700 border-amber-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },
  { id: 'at-6', name: '蛋挞', emoji: '🥧', category: '甜品', description: '酥脆的外皮，嫩滑的内馅，澳门葡挞的诱惑！', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },
  { id: 'at-7', name: '泡芙', emoji: '🧁', category: '甜品', description: '奶油从里面爆出来的那一刻，幸福感爆棚！', color: 'bg-pink-50 text-pink-600 border-pink-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },
  { id: 'at-8', name: '轻食沙拉', emoji: '🥗', category: '轻食', description: '吃草的一天，感觉自己像只兔子，但是为了瘦，值了！', color: 'bg-emerald-100 text-emerald-600 border-emerald-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },
  { id: 'at-9', name: '马卡龙', emoji: '🍪', category: '甜品', description: '法式小圆饼，颜值与美味并存的下午茶首选！', color: 'bg-pink-100 text-pink-700 border-pink-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },
  { id: 'at-10', name: '提拉米苏', emoji: '🍰', category: '甜品', description: '意大利经典甜品，咖啡与马斯卡彭的完美融合！', color: 'bg-amber-50 text-amber-700 border-amber-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },
  { id: 'at-11', name: '柠檬茶', emoji: '🍋', category: '饮品', description: '清新柠檬配上红茶，酸甜解腻，下午茶的绝佳选择！', color: 'bg-yellow-100 text-yellow-600 border-yellow-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },
  { id: 'at-12', name: '冰美式', emoji: '🧊', category: '饮品', description: '简单纯粹的冰咖啡，苦中带甘，提神醒脑的神器！', color: 'bg-stone-100 text-stone-600 border-stone-200', timeOfDay: [TimeOfDay.AFTERNOON_TEA] },

  // === 晚餐 (17:00-21:00) - 丰盛正餐 ===
  { id: 'dn-1', name: '火锅', emoji: '🍲', category: '聚餐', description: '一群人围着一个锅涮毛肚，这就是社交的最高境界！', color: 'bg-red-100 text-red-600 border-red-200', timeOfDay: [TimeOfDay.EVENING] },
  { id: 'dn-2', name: '北京烤鸭', emoji: '🍗', category: '京菜', description: '鸭子：我为北京付出了一切，最后却被卷起来吃掉！', color: 'bg-amber-100 text-amber-800 border-amber-300', timeOfDay: [TimeOfDay.EVENING] },
  { id: 'dn-3', name: '新疆大盘鸡', emoji: '🥘', category: '西北菜', description: '鸡肉土豆面条的三角恋，最后都被你一个人解决了！', color: 'bg-orange-100 text-orange-800 border-orange-300', timeOfDay: [TimeOfDay.EVENING] },
  { id: 'dn-4', name: '潮汕牛肉火锅', emoji: '🥩', category: '粤式', description: '牛肉的八百种死法，每一种都让人欲罢不能，连汤都想喝光！', color: 'bg-stone-100 text-stone-600 border-stone-200', timeOfDay: [TimeOfDay.EVENING] },
  { id: 'dn-5', name: '韩式烤肉', emoji: '🥓', category: '韩料', description: '五花肉在烤盘上滋滋作响，生菜是它的床，蒜泥是它的枕头！', color: 'bg-red-50 text-red-600 border-red-200', timeOfDay: [TimeOfDay.EVENING] },
  { id: 'dn-6', name: '寿喜烧', emoji: '🍲', category: '日料', description: '甜甜的酱油汤底里煮着牛肉，蘸着生鸡蛋，这是日本人的浪漫！', color: 'bg-orange-100 text-orange-600 border-orange-200', timeOfDay: [TimeOfDay.EVENING] },
  { id: 'dn-7', name: '披萨', emoji: '🍕', category: '意式', description: '芝士拉丝的那一刻，感觉整个世界都充满了爱！', color: 'bg-yellow-100 text-yellow-600 border-yellow-200', timeOfDay: [TimeOfDay.EVENING] },
  { id: 'dn-8', name: '煎牛排', emoji: '🥩', category: '西餐', description: '牛：我这一生都在奔跑，最后变成了你盘子里的五分熟！', color: 'bg-red-100 text-red-800 border-red-300', timeOfDay: [TimeOfDay.EVENING] },
  { id: 'dn-9', name: '意大利面', emoji: '🍝', category: '意式', description: '面条在酱汁里游泳，每一根都充满了异国风情！', color: 'bg-orange-50 text-orange-600 border-orange-200', timeOfDay: [TimeOfDay.EVENING] },
  { id: 'dn-10', name: '冬阴功汤', emoji: '🍲', category: '泰式', description: '酸辣虾汤，香茅的味道让人仿佛置身泰国海滩！', color: 'bg-red-100 text-red-600 border-red-200', timeOfDay: [TimeOfDay.EVENING] },
  { id: 'dn-11', name: '炸酱面', emoji: '🍜', category: '面食', description: '黄豆酱和面条的完美结合，菜码要全，酱要香，这才是正宗！', color: 'bg-stone-100 text-stone-600 border-stone-200', timeOfDay: [TimeOfDay.EVENING] },
  { id: 'dn-12', name: '刀削面', emoji: '🍜', category: '面食', description: '师傅的刀工就是艺术，每一根面条都带着削出来的灵魂！', color: 'bg-orange-50 text-orange-600 border-orange-200', timeOfDay: [TimeOfDay.EVENING] },

  // === 宵夜 (21:00-6:00) - 夜宵特色 ===
  { id: 'ls-1', name: '小龙虾', emoji: '🦞', category: '夜宵', description: '小龙虾：我长得这么红，就是为了让你在夜宵时想起我！', color: 'bg-red-100 text-red-600 border-red-300', timeOfDay: [TimeOfDay.LATE_NIGHT] },
  { id: 'ls-2', name: '羊肉串', emoji: '🍢', category: '烧烤', description: '炭火上的羊肉跳着桑巴，孜然和辣椒是它的舞伴！', color: 'bg-amber-100 text-amber-600 border-amber-200', timeOfDay: [TimeOfDay.LATE_NIGHT] },
  { id: 'ls-3', name: '螺蛳粉', emoji: '🍜', category: '广西特色', description: '闻起来像生化武器，吃起来像天堂美味，酸笋是魔鬼的调味料！', color: 'bg-purple-100 text-purple-600 border-purple-200', timeOfDay: [TimeOfDay.LATE_NIGHT] },
  { id: 'ls-4', name: '炸鸡', emoji: '🍗', category: '快餐', description: '卡路里是什么？不知道，只知道炸鸡让我快乐！', color: 'bg-amber-100 text-amber-600 border-amber-200', timeOfDay: [TimeOfDay.LATE_NIGHT] },
  { id: 'ls-5', name: '韩式炸鸡', emoji: '🍗', category: '韩料', description: '甜辣酱裹着酥脆的外皮，啤酒是它的最佳CP，韩剧女主都这么吃！', color: 'bg-orange-100 text-orange-600 border-orange-200', timeOfDay: [TimeOfDay.LATE_NIGHT] },
  { id: 'ls-6', name: '方便面', emoji: '🍜', category: '速食', description: '深夜的灵魂伴侣，三分钟就能治愈你的饥饿和孤独！', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', timeOfDay: [TimeOfDay.LATE_NIGHT] },
  { id: 'ls-7', name: '烧烤', emoji: '🍖', category: '夜宵', description: '深夜的烟火气，烤串配啤酒，人生圆满了！', color: 'bg-red-50 text-red-600 border-red-200', timeOfDay: [TimeOfDay.LATE_NIGHT] },
  { id: 'ls-8', name: '麻辣烫', emoji: '🍲', category: '川渝', description: '一个人的火锅，孤独者的狂欢，想吃什么拿什么，就是这么任性！', color: 'bg-red-100 text-red-600 border-red-200', timeOfDay: [TimeOfDay.LATE_NIGHT] },
  { id: 'ls-9', name: '南昌拌粉', emoji: '🍜', category: '粉类', description: '江西人的骄傲，辣油花生米爽滑Q弹，一碗就上头！', color: 'bg-red-50 text-red-600 border-red-200', timeOfDay: [TimeOfDay.LATE_NIGHT] },

  // === 全天适合 ===
  { id: 'al-1', name: '寿司', emoji: '🍣', category: '日料', description: '米饭和鱼的爱情结晶，芥末是它们的媒人，Wasabi会让你泪流满面！', color: 'bg-rose-100 text-rose-600 border-rose-200' },
  { id: 'al-6', name: '天妇罗', emoji: '🍤', category: '日料', description: '万物皆可天妇罗，炸虾炸鱼炸蔬菜，酥脆到让人怀疑人生！', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  { id: 'al-10', name: '水饺/云吞', emoji: '🥟', category: '速食', description: '冰箱里的存货，开水一煮就是一顿，懒人的智慧结晶！', color: 'bg-stone-100 text-stone-600 border-stone-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-11', name: 'Subway/三明治', emoji: '🥪', category: '轻食', description: '蔬菜和肉类的层层叠叠，像极了人生的起起落落！', color: 'bg-green-100 text-green-600 border-green-200' },
  { id: 'al-12', name: 'Taco', emoji: '🌮', category: '墨西哥', description: '玉米饼卷一切，萨尔萨酱是它的灵魂，吃的时候要小心别掉衣服上！', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  { id: 'al-14', name: '凉皮', emoji: '🥗', category: '陕西风味', description: '夏天的一股清流，酸辣爽口，吃完感觉灵魂都升华了！', color: 'bg-red-50 text-red-500 border-red-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-15', name: '肉夹馍', emoji: '🥙', category: '陕西风味', description: '肉：我被夹在中间好难受，馍：你难受什么，最后被吃掉的是我！', color: 'bg-amber-50 text-amber-700 border-amber-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-16', name: '剩菜盲盒', emoji: '🥡', category: '生存', description: '昨天剩菜的二次生命，微波炉加热后又是新的一餐！', color: 'bg-gray-100 text-gray-500 border-gray-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING, TimeOfDay.LATE_NIGHT] },
  { id: 'al-17', name: 'KFC疯狂星期四', emoji: '🍗', category: '快餐', description: 'V我50，今天我请客！疯四文学，永不过时！', color: 'bg-red-100 text-red-600 border-red-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING, TimeOfDay.LATE_NIGHT] },
  { id: 'al-18', name: '麦当劳穷鬼套餐', emoji: '🍔', category: '快餐', description: '1+1随心配，打工人的快乐就是这么简单！', color: 'bg-yellow-100 text-yellow-600 border-yellow-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING, TimeOfDay.LATE_NIGHT] },

  // === 正餐时段 (午餐+晚餐) - 不适合下午茶 ===
  { id: 'al-2', name: '日式拉面', emoji: '🍜', category: '日料', description: '豚骨汤熬了八小时，溏心蛋等了三分钟，你只用了五分钟就吃完了！', color: 'bg-stone-100 text-stone-600 border-stone-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-3', name: '鳗鱼饭', emoji: '🍱', category: '日料', description: '鳗鱼：我游了那么久，最后还是被你盖在饭上了！', color: 'bg-amber-100 text-amber-700 border-amber-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-4', name: '石锅拌饭', emoji: '🥘', category: '韩料', description: '锅巴是这道菜的灵魂，辣酱是它的心脏，拌匀了就是完美的人生！', color: 'bg-red-100 text-red-600 border-red-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-5', name: '部队锅', emoji: '🥘', category: '韩料', description: '泡面年糕午餐肉的大杂烩，乱炖也有乱炖的美味！', color: 'bg-red-50 text-red-600 border-red-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-7', name: '咖喱饭', emoji: '🍛', category: '日式/泰式', description: '浓郁的咖喱汁浇在米饭上，每一口都是异国风情的拥抱！', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-8', name: '越南河粉', emoji: '🍜', category: '越南', description: '清淡鲜美的汤头，滑嫩的河粉，九层塔是它的点睛之笔！', color: 'bg-green-50 text-green-600 border-green-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-9', name: '泰式猪脚饭', emoji: '🍛', category: '泰式', description: '软糯入味的猪脚，酸辣的酱汁，每一口都是泰式风情！', color: 'bg-orange-50 text-orange-700 border-orange-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-13', name: '酸汤猪脚', emoji: '🥘', category: '贵州风味', description: '猪脚：我在酸汤里泡澡，最后变成了胶原蛋白，让你变得更美！', color: 'bg-red-50 text-red-600 border-red-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-19', name: '白切鸡', emoji: '🍗', category: '粤菜', description: '皮滑肉嫩，蘸上姜蓉酱油，简单却最能体现鸡肉的原汁原味！', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
  { id: 'al-20', name: '猪脚饭', emoji: '🍛', category: '粤式正餐', description: '卤得软烂入味的猪脚，配上酸菜和卤蛋，男人的浪漫就是这么实在！', color: 'bg-red-100 text-red-700 border-red-200', timeOfDay: [TimeOfDay.NOON, TimeOfDay.EVENING] },
];