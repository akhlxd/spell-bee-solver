tabl = document.querySelector('table');
tabl.deleteTHead();
console.log(tabl);
tabl.removeAttribute("border");
tabl.setAttribute("class", "tbl");
let trs = tabl.querySelector('tbody');
for (let i=0, row; row = trs.rows[i]; i++) {
		for (let j=0, col; col=row.cells[j]; j++) {
				if (j==0) {
					col.remove();
					continue;
				}
			}
		row.setAttribute("class", "tablerow");
}
	
