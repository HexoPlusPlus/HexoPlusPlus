
(() => {
    class OwO {
        constructor(option) {
            const defaultOption = {
				logo: `<svg t="1612669041308" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2519" width="32" height="32"><path d="M512 512m-511.982387 0a511.982387 511.982387 0 1 0 1023.964774 0 511.982387 511.982387 0 1 0-1023.964774 0Z" fill="#F9C228" p-id="2520"></path><path d="M917.619539 199.639491C761.536154-3.082215 483.485105-56.554248 265.951152 62.930031a531.620502 531.620502 0 0 0-166.598142 387.161472c0 294.430822 238.686756 533.099966 533.099966 533.099966a535.424837 535.424837 0 0 0 101.219951-9.598899 514.289646 514.289646 0 0 0 90.705195-55.973031C1048.393533 745.138768 1090.223598 423.672515 917.619539 199.639491z" fill="#FCDC22" p-id="2521"></path><path d="M972.042656 550.272308c-111.329618 114.904988-252.600757 198.670795-415.482628 260.033299 0 0 55.867355 156.664603 207.829377 101.53698 250.628139-90.846096 207.653251-361.570279 207.653251-361.570279z" fill="#FC9B88" p-id="2522"></path><path d="M522.690884 570.08655a80.119986 64.145304 90 1 0 128.290609 0 80.119986 64.145304 90 1 0-128.290609 0Z" fill="#282828" p-id="2523"></path><path d="M860.519298 429.449467a80.119986 54.881046 90 1 0 109.762092 0 80.119986 54.881046 90 1 0-109.762092 0Z" fill="#282828" p-id="2524"></path><path d="M953.813553 724.584795a261.319023 261.319023 0 0 0-116.014585-59.988717C754.121225 723.616099 659.699759 771.434469 556.560028 810.305607c0 0 55.867355 156.664603 207.829377 101.53698 110.959752-40.209701 164.361335-115.64472 189.424148-187.257792z" fill="#EA0F1A" p-id="2525"></path></svg>`,
                container: document.getElementsByClassName('OwO')[0],
                position: 'down',
                width: '100%',
                maxHeight: '250px',
                api: 'https://api.anotherhome.net/OwO/OwO.json'
            };
            for (let defaultKey in defaultOption) {
                if (defaultOption.hasOwnProperty(defaultKey) && !option.hasOwnProperty(defaultKey)) {
                    option[defaultKey] = defaultOption[defaultKey];
                }
            }
            this.container = option.container;
            if (option.position === 'up') {
                this.container.classList.add('OwO-up');
            }

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        this.odata = JSON.parse(xhr.responseText);
                        this.init(option);
                    }
                    else {
                        console.log('OwO data request was unsuccessful: ' + xhr.status);
                    }
                }
            };
            xhr.open('get', option.api, true);
            xhr.send(null);
        }
        init(option) {
            this.packages = Object.keys(this.odata);

            // fill in HTML
            let html = `
            <div class="OwO-logo"><span>${option.logo}<\/span><\/div>
            <div class="OwO-body" style="width: ${option.width}">`;
            let icon=""
			let src=""
            for (let i = 0; i < this.packages.length; i++) {

                html += `
                <ul class="OwO-items OwO-items-${this.odata[this.packages[i]].type}" style="max-height: ${parseInt(option.maxHeight) - 53 + 'px'};">`;

                let opackage = this.odata[this.packages[i]].container;
                for (let j = 0; j < opackage.length; j++) {
					
					
					var regex = /src=[\'\"]?([^\'\"]*)[\'\"]?/;
					src = regex.exec(opackage[j].icon);
					try{
					src=src[1]
					//console.log(src)
					icon = `<img src="" data-src="${src}" class="hpp_emo_${this.packages[i]}">`
					}catch(e){/*console.log(e);*/icon=opackage[j].icon}
                    html += `
                    <li class="OwO-item" title="${opackage[j].text}">${icon}<\/li>`;

                }

                html += `
                <\/ul>`;
            }
            
            html += `
                <div class="OwO-bar">
                    <ul class="OwO-packages">`;

                    for (let i = 0; i < this.packages.length; i++) {

                        html += `
                        <li><span>${this.packages[i]}<\/span><\/li>`

                    }

            html += `
                    <\/ul>
                <\/div>
            <\/div>
            `;
            this.container.innerHTML = html;

            // bind event
            this.logo = this.container.getElementsByClassName('OwO-logo')[0];
            this.logo.addEventListener('click', () => {
                this.toggle();
            });
			let r_src=""
            this.container.getElementsByClassName('OwO-body')[0].addEventListener('click', (e)=> {
			let target = null;
                if (e.target.classList.contains('OwO-item')) {
                    target = e.target;
                }
                else if (e.target.parentNode.classList.contains('OwO-item')) {
                    target = e.target.parentNode;
                }
                if (target) {
                    
					var regex = /src=[\'\"]?([^\'\"]*)[\'\"]?/;
					r_src = regex.exec(target.innerHTML);
					try{
					r_src=r_src[1]
					icon = `![](${r_src})`
					}catch(e){icon=target.innerHTML;console.log(icon+"ERROR")}
					hpp_add_mark(icon)
					
					
                }
            });

            this.packagesEle = this.container.getElementsByClassName('OwO-packages')[0];
            for (let i = 0; i < this.packagesEle.children.length; i++) {
                ((index) =>{
                    this.packagesEle.children[i].addEventListener('click', () => {
                        this.tab(index);
                    });
                })(i);
            }

            this.tab(0);
        }

        toggle() {
            if (this.container.classList.contains('OwO-open')) {
                this.container.classList.remove('OwO-open');
            }
            else {
                this.container.classList.add('OwO-open');
            }
        }

        tab(index) {
			let inn=""
            const itemsShow = this.container.getElementsByClassName('OwO-items-show')[0];
            if (itemsShow) {
                itemsShow.classList.remove('OwO-items-show');
            }
            this.container.getElementsByClassName('OwO-items')[index].classList.add('OwO-items-show');

            const packageActive = this.container.getElementsByClassName('OwO-package-active')[0];
			$(`.hpp_emo_${this.packages[index]}`).Lazy();
            if (packageActive) {
                packageActive.classList.remove('OwO-package-active');
            }
            this.packagesEle.getElementsByTagName('li')[index].classList.add('OwO-package-active');
        }
    }
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = OwO;
    }
    else {
        window.OwO = OwO;
    }
})();
