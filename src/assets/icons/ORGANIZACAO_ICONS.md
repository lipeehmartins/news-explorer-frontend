# Organização dos ícones (News Explorer)

Use este arquivo como guia para salvar os SVGs do Figma.

## 1) Header (`src/assets/icons/header`)
- `logo-newsexplorer.svg` (logo textual, se exportar como SVG)
- `logo-circle-n.svg` (ícone circular com N)
- `icon-logout.svg` (ícone de sair)

## 2) Card de notícia (`src/assets/icons/card`)
- `icon-bookmark-default.svg` (estado normal)
- `icon-bookmark-hover.svg` (estado hover)
- `icon-bookmark-active.svg` (estado marcado/salvo)
- `icon-trash-default.svg` (lixeira para página de salvos)
- `icon-trash-hover.svg` (lixeira hover)

## 3) Popup/Modal (`src/assets/icons/popup`)
- `icon-close.svg` (botão fechar modal)

## 4) Favicon (`public/favicon`)
- `favicon.svg` (ícone principal da aba)
- (opcional) `favicon-32x32.png`
- (opcional) `apple-touch-icon.png`

---

## Regras rápidas
- Formato preferencial: SVG para ícones.
- Não altere os nomes sem avisar (vamos importar no código depois).
- Se o Figma tiver variantes de estado, exporte cada estado separadamente.
- Sempre confira se o `viewBox` do SVG está correto para evitar distorção.
