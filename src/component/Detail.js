export default class Detail {
  constructor({ $target, fetchData }) {
    // this.section = document.createElement('section');
    // this.section.classList.add('container');
    this.section = document.createElement('section');
    this.section.classList.add('container');
    this.section.classList.add('box_detail');
    this.data = [];
    $target.appendChild(this.section);
    fetchData();
  }

  setData(data) {
    this.data = data;
    this.render();
  }

  dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  }

  render() {
    this.section.innerHTML = '';
    // const text = document.createElement('h2');
    // text.innerText = '예약 정보';
    // this.section.appendChild(text);

    this.data.forEach((val, idx) => {

      // 예약자 정보
      const customerInfo = val.customer;
      // 테이블 정보
      const tableInfo = val.tables;
      // 메뉴 정보
      const menuInfo = val.menus;

      const block = document.createElement('div');
      block.classList.add('wrap_detail');
      const resvBlock = document.createElement('div');
      const resvBlock2 = document.createElement('div');
      const resvBlock3 = document.createElement('div');
      // const title = document.createElement('h2');

      const resvStatusTitle = document.createElement('span');
      const resvTimeTitle = document.createElement('span');
      const registeredTimeTitle = document.createElement('span');

      const resvStatus = document.createElement('span');
      const resvTime = document.createElement('span');
      const registeredTime = document.createElement('span');

      const customerNameTitle = document.createElement('span');
      const customerLevelTitle = document.createElement('span');
      const customerMemoTitle = document.createElement('span');

      const customerName = document.createElement('span');
      const customerLevel = document.createElement('span');
      const customerMemo = document.createElement('span');

      const customerRequestTitle = document.createElement('span');
      const customerRequest = document.createElement('span');

      resvStatusTitle.innerText = '예약 상태';
      resvStatus.innerText = val.status === 'reserved' ? '예약' : 'seated' ? '착석 중' : '퇴실';
      resvTimeTitle.innerText = '예약 시간'
      resvTime.innerText = this.dateFormat(new Date(val.timeReserved));
      registeredTimeTitle.innerText = '접수 시간'
      registeredTime.innerText = this.dateFormat(new Date(val.timeRegistered));

      customerNameTitle.innerText = '고객 성명';
      customerName.innerText = customerInfo.name;
      customerLevelTitle.innerText = '고객 등급';
      customerLevel.innerText = customerInfo.level;
      customerMemoTitle.innerText = '고객 메모';
      customerMemo.innerText = customerInfo.memo;

      customerRequestTitle.innerText = '요청 사항';
      customerRequest.innerText = customerInfo.request;

      
      // val.timeReserved
      // resvTime.innerText = toStringByFormatting(new Date(2021, 0, 1));
      // resvTime.innerText = dateFormat(new Date(val.timeReserved));
    
      resvBlock.appendChild(resvStatusTitle);
      resvBlock.appendChild(resvStatus);
      resvBlock.appendChild(resvTimeTitle);
      resvBlock.appendChild(resvTime);
      resvBlock.appendChild(registeredTimeTitle);
      resvBlock.appendChild(registeredTime);
      block.appendChild(resvBlock);

      resvBlock2.appendChild(customerNameTitle);
      resvBlock2.appendChild(customerName);
      resvBlock2.appendChild(customerLevelTitle);
      resvBlock2.appendChild(customerLevel);
      resvBlock2.appendChild(customerMemoTitle);
      resvBlock2.appendChild(customerMemo);
      block.appendChild(resvBlock2);

      resvBlock3.appendChild(customerRequestTitle);
      resvBlock3.appendChild(customerRequest);
      block.appendChild(resvBlock3);


      // // title.innerText = val.customer.name;
      // customerName.innerText = customerInfo.name;
      // let tableList = [];
      // tableInfo.forEach(item => {
      //   tableList.push(item.name)
      // });
      // tableName.innerText = tableList.join(', ');
      // // block.appendChild(title);
      // resvBlock.appendChild(customerName);
      // resvBlock.appendChild(tableName);
      // block.appendChild(resvBlock);

      // adult.innerText = '성인 ';
      // child.innerText = '아이 '; 
      // adultCnt.innerText = customerInfo.adult;
      // childCnt.innerText = customerInfo.child;
      // resvBlock2.appendChild(adult);
      // resvBlock2.appendChild(adultCnt);
      // resvBlock2.appendChild(child);
      // resvBlock2.appendChild(childCnt);
      // block.appendChild(resvBlock2);

      // let menuList = []
      // menuInfo.forEach(item => {
      //   menuList.push(`${item.name} (${item.qty})`)
      // })
      // menuName.innerText = menuList.join(', ')
      // resvBlock3.appendChild(menuName);
      // block.appendChild(resvBlock3);

      this.section.appendChild(block);

//       function dateFormat(date) {
//         let month = date.getMonth() + 1;
//         let day = date.getDate();
//         let hour = date.getHours();
//         let minute = date.getMinutes();

//         month = month >= 10 ? month : '0' + month;
//         day = day >= 10 ? day : '0' + day;
//         hour = hour >= 10 ? hour : '0' + hour;
//         minute = minute >= 10 ? minute : '0' + minute;

//         return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute;
// }

      // function leftPad(value) { 
      //   if (value >= 10) { 
      //     return value; 
      //   } 
      //   return `0${value}`; 
      // }

      // function toStringByFormatting(source, delimiter = '-') { 
      //   const year = source.getFullYear(); 
      //   const month = leftPad(source.getMonth() + 1); 
      //   const day = leftPad(source.getDate()); 
      //   const time = source.get
      //   return [year, month, day].join(delimiter); 
      // }

    });
  
  }

  

}