
import type { FoodItem } from './types';

export const FOOD_DATA: FoodItem[] = [
  // --- 中式正餐 ---
  { id: 'cn-1', name: '火锅', emoji: '🍲', category: '聚餐首选', description: '毛肚黄喉鸭肠，红油翻滚的快乐。', color: 'bg-red-100 text-red-600 border-red-200' },
  { id: 'cn-2', name: '北京烤鸭', emoji: '🍗', category: '京味', description: '皮脆肉嫩，葱丝黄瓜甜面酱，卷！', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'cn-3', name: '红烧肉', emoji: '🥓', category: '家常硬菜', description: '肥而不腻，入口即化，拌饭一绝。', color: 'bg-red-50 text-red-700 border-red-200' },
  { id: 'cn-4', name: '水煮鱼', emoji: '🐟', category: '川菜', description: '麻辣鲜香，油而不腻，鱼肉滑嫩。', color: 'bg-orange-100 text-orange-600 border-orange-200' },
  { id: 'cn-5', name: '酸菜鱼', emoji: '🐟', category: '川菜', description: '酸爽开胃，汤都能喝三碗。', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  { id: 'cn-6', name: '麻婆豆腐', emoji: '🍛', category: '川菜', description: '麻辣烫香酥嫩，米饭杀手。', color: 'bg-red-100 text-red-600 border-red-200' },
  { id: 'cn-7', name: '宫保鸡丁', emoji: '🥜', category: '经典', description: '甜酸微辣，花生米比肉好吃。', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'cn-8', name: '新疆大盘鸡', emoji: '🥘', category: '西北风味', description: '土豆软糯，裤带面蘸汤是灵魂。', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { id: 'cn-9', name: '羊肉串', emoji: '🍢', category: '烧烤', description: '孜然辣椒面，炭火烟熏味。', color: 'bg-amber-100 text-amber-600 border-amber-200' },
  { id: 'cn-10', name: '潮汕牛肉火锅', emoji: '🥩', category: '粤式', description: '吊龙匙柄五花趾，讲究一个鲜。', color: 'bg-stone-100 text-stone-600 border-stone-200' },
  { id: 'cn-11', name: '广式早茶', emoji: '🥟', category: '粤式', description: '虾饺烧卖凤爪排骨，一盅两件。', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  { id: 'cn-12', name: '煲仔饭', emoji: '🍚', category: '粤式', description: '锅巴焦香，腊味油脂渗入米饭。', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'cn-13', name: '螺蛳粉', emoji: '🍜', category: '广西特色', description: '闻着臭吃着香，酸笋是灵魂！', color: 'bg-purple-100 text-purple-600 border-purple-200' },
  { id: 'cn-14', name: '兰州拉面', emoji: '🍜', category: '面食', description: '一清二白三红四绿五黄。', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 'cn-15', name: '肉夹馍', emoji: '🥙', category: '陕西风味', description: '馍酥肉烂，肥瘦相间，满口留香。', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'cn-16', name: '凉皮', emoji: '🥗', category: '陕西风味', description: '酸辣爽口，夏天必吃。', color: 'bg-red-50 text-red-500 border-red-200' },
  { id: 'cn-17', name: '小龙虾', emoji: '🦞', category: '夜宵', description: '麻辣蒜蓉十三香，配啤酒绝了。', color: 'bg-red-100 text-red-600 border-red-300' },
  { id: 'cn-18', name: '煎饼果子', emoji: '🌯', category: '早餐', description: '加个蛋加根肠，薄脆要多放。', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'cn-19', name: '沙县小吃', emoji: '🥟', category: '快餐', description: '拌面扁食，打工人的避风港。', color: 'bg-gray-100 text-gray-600 border-gray-200' },
  { id: 'cn-20', name: '海南鸡饭', emoji: '🍛', category: '特色', description: '鸡皮爽滑，鸡油饭喷香。', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  { id: 'cn-21', name: '酸汤猪脚', emoji: '🥘', category: '贵州风味', description: '酸辣开胃，满满胶原蛋白。', color: 'bg-red-50 text-red-600 border-red-200' },
  { id: 'cn-22', name: '冒菜/麻辣烫', emoji: '🍲', category: '川渝', description: '一个人的火锅。', color: 'bg-red-100 text-red-600 border-red-200' },

  // --- 西式/快餐 ---
  { id: 'ws-1', name: '美式汉堡', emoji: '🍔', category: '西式快餐', description: '多汁牛肉饼，融化的芝士。', color: 'bg-orange-100 text-orange-600 border-orange-200' },
  { id: 'ws-2', name: '披萨', emoji: '🍕', category: '意式', description: '薄底厚底，芝士拉丝。', color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
  { id: 'ws-3', name: '炸鸡', emoji: '🍗', category: '快乐源泉', description: '外酥里嫩，热量炸弹。', color: 'bg-amber-100 text-amber-600 border-amber-200' },
  { id: 'ws-4', name: '煎牛排', emoji: '🥩', category: '西餐', description: '五分熟，黑胡椒海盐。', color: 'bg-red-100 text-red-800 border-red-300' },
  { id: 'ws-5', name: '意大利面', emoji: '🍝', category: '西餐', description: '番茄肉酱还是奶油培根？', color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { id: 'ws-6', name: 'Subway/三明治', emoji: '🥪', category: '轻食', description: '多加蔬菜，健康选择。', color: 'bg-green-100 text-green-600 border-green-200' },
  { id: 'ws-7', name: '轻食沙拉', emoji: '🥗', category: '减脂', description: '吃草的一天，为了健康。', color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
  { id: 'ws-8', name: 'Taco', emoji: '🌮', category: '墨西哥', description: '玉米饼夹一切，萨尔萨酱。', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  
  // --- 日韩料理 ---
  { id: 'jk-1', name: '寿司', emoji: '🍣', category: '日料', description: '三文鱼金枪鱼，一口入魂。', color: 'bg-rose-100 text-rose-600 border-rose-200' },
  { id: 'jk-2', name: '日式拉面', emoji: '🍜', category: '日料', description: '豚骨浓汤，溏心蛋。', color: 'bg-stone-100 text-stone-600 border-stone-200' },
  { id: 'jk-3', name: '鳗鱼饭', emoji: '🍱', category: '日料', description: '肥美鳗鱼，酱汁浓郁。', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'jk-4', name: '寿喜烧', emoji: '🍲', category: '日料', description: '甜甜的酱油汤底煮牛肉，蘸无菌蛋。', color: 'bg-orange-100 text-orange-600 border-orange-200' },
  { id: 'jk-5', name: '韩式烤肉', emoji: '🥓', category: '韩料', description: '滋滋冒油五花肉，生菜包蒜。', color: 'bg-red-50 text-red-600 border-red-200' },
  { id: 'jk-6', name: '石锅拌饭', emoji: '🥘', category: '韩料', description: '锅巴，辣酱，拌匀了吃。', color: 'bg-red-100 text-red-600 border-red-200' },
  { id: 'jk-7', name: '韩式炸鸡', emoji: '🍗', category: '韩料', description: '甜辣酱，蜂蜜芥末，配啤酒。', color: 'bg-orange-100 text-orange-600 border-orange-200' },
  { id: 'jk-8', name: '部队锅', emoji: '🥘', category: '韩料', description: '泡面年糕午餐肉，乱炖的快乐。', color: 'bg-red-50 text-red-600 border-red-200' },
  { id: 'jk-9', name: '天妇罗', emoji: '🍤', category: '日料', description: '万物皆可炸，酥脆不油腻。', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  { id: 'jk-10', name: '咖喱饭', emoji: '🍛', category: '日式/泰式', description: '浓郁辛香，拌饭神器。', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },

  // --- 东南亚/其他 ---
  { id: 'sea-1', name: '越南河粉', emoji: '🍜', category: '越南', description: '清淡鲜美，加柠檬和九层塔。', color: 'bg-green-50 text-green-600 border-green-200' },
  { id: 'sea-2', name: '冬阴功汤', emoji: '🍲', category: '泰式', description: '酸辣虾汤，香茅味道独特。', color: 'bg-red-100 text-red-600 border-red-200' },
  { id: 'sea-3', name: '泰式猪脚饭', emoji: '🍛', category: '泰式', description: '软糯入味，配酸辣酱汁。', color: 'bg-orange-50 text-orange-700 border-orange-200' },

  // --- 面食/粉 ---
  { id: 'nd-1', name: '武汉热干面', emoji: '🍜', category: '面食', description: '芝麻酱拌面，香迷糊了。', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'nd-2', name: '重庆小面', emoji: '🍜', category: '面食', description: '麻辣素面，早餐唤醒灵魂。', color: 'bg-red-100 text-red-600 border-red-200' },
  { id: 'nd-3', name: '炸酱面', emoji: '🍜', category: '面食', description: '菜码要全，酱要香。', color: 'bg-stone-100 text-stone-600 border-stone-200' },
  { id: 'nd-4', name: '刀削面', emoji: '🍜', category: '面食', description: '面条劲道，卤子丰富。', color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { id: 'nd-5', name: '南昌拌粉', emoji: '🍜', category: '粉类', description: '辣油花生米，爽滑Q弹。', color: 'bg-red-50 text-red-600 border-red-200' },
  
  // --- 简单凑合 ---
  { id: 'ez-1', name: '方便面', emoji: '🍜', category: '速食', description: '在这个时刻，它就是美味。', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  { id: 'ez-2', name: '水饺/云吞', emoji: '🥟', category: '速食', description: '冰箱里的存货，煮一煮就好。', color: 'bg-stone-100 text-stone-600 border-stone-200' },
  { id: 'ez-3', name: '剩菜盲盒', emoji: '🥡', category: '生存', description: '热一下昨天剩下的，环保又省钱。', color: 'bg-gray-100 text-gray-500 border-gray-200' },
  { id: 'ez-4', name: 'KFC疯狂星期四', emoji: '🍗', category: '快餐', description: 'V我50，看看实力。', color: 'bg-red-100 text-red-600 border-red-200' },
  { id: 'ez-5', name: '麦当劳穷鬼套餐', emoji: '🍔', category: '快餐', description: '1+1随心配，打工人的光。', color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },

  // --- 甜点/下午茶 ---
  { id: 'ds-1', name: '奶茶', emoji: '🧋', category: '饮品', description: '靠奶茶续命。', color: 'bg-stone-100 text-stone-600 border-stone-200' },
  { id: 'ds-2', name: '蛋糕甜点', emoji: '🍰', category: '甜品', description: '生活太苦，需要一点甜。', color: 'bg-pink-100 text-pink-600 border-pink-200' },
  { id: 'ds-3', name: '冰淇淋', emoji: '🍦', category: '甜品', description: '不管春夏秋冬，都想吃一口。', color: 'bg-blue-50 text-blue-500 border-blue-200' },
  { id: 'ds-4', name: '水果捞', emoji: '🥝', category: '甜品', description: '酸奶拌水果，健康又好吃。', color: 'bg-green-50 text-green-600 border-green-200' },
];
