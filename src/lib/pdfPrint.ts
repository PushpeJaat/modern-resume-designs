const PRINT_MODE_CLASS = "printing-resume";
const PRINT_SHELL_CLASS = "resume-print-shell";
const PRINT_ROOT_ATTR = "data-print-root";
const RESUME_WIDTH_PX = 794;

const waitForNextPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });

const waitForAssets = async (root: HTMLElement) => {
  const images = Array.from(root.querySelectorAll("img"));

  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }

          const done = () => {
            img.removeEventListener("load", done);
            img.removeEventListener("error", done);
            resolve();
          };

          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        })
    )
  );

  if ("fonts" in document) {
    await document.fonts.ready;
  }

  await waitForNextPaint();
};

const removeExistingPrintShell = () => {
  document.querySelector(`.${PRINT_SHELL_CLASS}`)?.remove();
};

const waitForPrintDialog = () =>
  new Promise<void>((resolve) => {
    let settled = false;

    const done = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener("afterprint", done);
      resolve();
    };

    window.addEventListener("afterprint", done, { once: true });
    window.print();
    window.setTimeout(done, 1500);
  });

export const printResumeFromNode = async (sourceNode: HTMLElement, fileName: string) => {
  removeExistingPrintShell();

  const shell = document.createElement("div");
  shell.className = PRINT_SHELL_CLASS;

  const clone = sourceNode.cloneNode(true) as HTMLElement;
  clone.setAttribute(PRINT_ROOT_ATTR, "true");
  clone.style.width = `${RESUME_WIDTH_PX}px`;
  clone.style.maxWidth = "none";
  clone.style.margin = "0 auto";

  shell.appendChild(clone);
  document.body.appendChild(shell);

  const previousTitle = document.title;
  document.title = fileName.replace(/\.pdf$/i, "");
  document.body.classList.add(PRINT_MODE_CLASS);

  try {
    await waitForAssets(clone);
    await waitForPrintDialog();
  } finally {
    document.title = previousTitle;
    document.body.classList.remove(PRINT_MODE_CLASS);
    shell.remove();
  }
};