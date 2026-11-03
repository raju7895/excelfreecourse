# Profile photo for the creator identity card

Save Utkarsh Bajpai's profile photo here with the exact filename:

```
excel-master-index/assets/images/utkarsh-bajpai.jpg
```

(relative to the project root; inside the site it resolves to
`assets/images/utkarsh-bajpai.jpg`)

The creator card in `index.html` references this path with:

```html
<img src="assets/images/utkarsh-bajpai.jpg" ... onerror="... show monogram fallback ..." />
```

Until the real photo is saved at that path, the card shows the "UB" monogram
instead of a broken image. No stock or AI-generated face is used.
