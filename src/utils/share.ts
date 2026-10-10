/**
 * 分享相关工具
 * 纯前端实现：项目没有任何后端接口，所谓"分享"就是复制一段带引导链接的文案
 */

/** 站点地址（分享文案里带的引导链接） */
export const SITE_URL = 'https://eat.evan666.cc';

/**
 * 生成分享文案：抽到的美食 + 引导话术 + 站点地址
 * @param name  美食名称
 * @param emoji 美食表情
 */
export const buildShareText = (name: string, emoji: string): string =>
  `别纠结了！「今天吃什么」帮我抽到了 ${emoji} ${name}，你也来抽一个 👉 ${SITE_URL}`;

/**
 * 复制文本到剪贴板
 * 优先使用 Clipboard API；非 HTTPS 或旧浏览器降级到 execCommand
 * @returns 是否复制成功
 */
export const copyText = async (text: string): Promise<boolean> => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // 复制被拒绝，继续走降级方案
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const succeeded = document.execCommand('copy');
    document.body.removeChild(textarea);
    return succeeded;
  } catch {
    return false;
  }
};

/**
 * 复制美食的分享文案
 * @returns 是否复制成功
 */
export const shareFood = (name: string, emoji: string): Promise<boolean> =>
  copyText(buildShareText(name, emoji));
