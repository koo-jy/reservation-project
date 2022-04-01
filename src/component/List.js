export default class List {
  constructor({ $target, fetchData }) {
    this.section = document.createElement('section');
    this.section.classList.add('container');
    this.section.id = 'container';
    this.data = [];    
    $target.appendChild(this.section);
    fetchData();
  }

  setData(data) {
    this.data = data;
    this.render();
  }

  render() {
    const isMobile = () => { 
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    }
    
    this.section.innerHTML = '';
    const text = document.createElement('h1');
    text.classList.add('title');
    text.innerText = '예약 목록';
    text.id = 'title_pc';
    this.section.appendChild(text);
    this.block = document.createElement('div');
    this.block.classList.add('wrap_list');
    this.block.id = 'ListBlock';
    this.section.appendChild(this.block);
    this.detailBlock = document.createElement('div');
    this.detailBlock.classList.add('wrap_detail');
    this.detailBlock.id = 'detail';

    if (isMobile) {
      this.detailBlock.classList.add('hide');
    }
    this.section.appendChild(this.detailBlock);

    function dateFormat(date) {
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

    function setDetail(val) {
      if (val !== null && val !== undefined && val !== '') {
        document.getElementById('resvStatus').innerText = val.status === 'reserved' ? '예약' : 'seated' ? '착석 중' : '퇴실';
        document.getElementById('resvTime').innerText = dateFormat(new Date(val.timeReserved));
        document.getElementById('registeredTime').innerText = dateFormat(new Date(val.timeRegistered));
        document.getElementById('customerNameDetail').innerText = val.customer.name;
        document.getElementById('customerLevel').innerText = val.customer.level ? val.customer.level : '-';
        document.getElementById('customerMemo').innerText = val.customer.memo ? val.customer.memo : '-';
        document.getElementById('customerRequest').innerText = val.customer.request ? val.customer.request : ' -';
      }
    }

    this.data.forEach((val, idx) => {

      if (val.status !== 'done') {
        // 예약자 정보
      const customerInfo = val.customer;
      // 테이블 정보
      const tableInfo = val.tables;
      // 메뉴 정보
      const menuInfo = val.menus;

      const rowBlock = document.createElement('div');
      rowBlock.classList.add('wrap_row');
      rowBlock.addEventListener('click', function(e) {
        e.preventDefault();
        setDetail(val);
        if (isMobile) {
          const box = document.getElementById('container');
          box.classList.add('modal-open');
          const detail = document.getElementById('detail');
          detail.classList.remove('hide');
        }
      });
      rowBlock.id = `rowBlock-${idx}`;

      const leftBlock = document.createElement('div');
      leftBlock.classList.add('wrap_left');
      const timeInfo = document.createElement('div');
      const statusInfo = document.createElement('div');

      const centerBlock = document.createElement('div');
      centerBlock.classList.add('wrap_center');
      const subBlock = document.createElement('div');
      subBlock.classList.add('txt_item', 'txt_ellipsis');
      const subBlock2 = document.createElement('div');
      subBlock2.classList.add('txt_item', 'txt_ellipsis');
      const subBlock3 = document.createElement('div');
      subBlock3.classList.add('txt_item', 'txt_ellipsis');

      const rightBlock = document.createElement('div');
      rightBlock.classList.add('wrap_right');
      const toggleBtn = document.createElement('button');
      toggleBtn.id = `button-${idx}`;
      toggleBtn.classList.add('btn_toggle');
      toggleBtn.classList.add(val.status === 'reserved' ? 'btn_reserved' : 'btn_seated');
      toggleBtn.innerText = val.status === 'reserved' ? '착석' : '퇴석';
      toggleBtn.addEventListener('click', function clickToggle(e) {
        e.stopPropagation();
        e.preventDefault();
        const btn = document.getElementById(toggleBtn.id);
        if(btn.innerText === '착석') {
          btn.innerText = '퇴석';
          statusInfo.innerText = '착석 중';
          statusInfo.className = 'txt_seated';
        } else {
          const curRowBlock = document.getElementById(rowBlock.id);
          const curBlock = document.getElementById('ListBlock');
          curBlock.removeChild(curRowBlock);
        }
      });
      rightBlock.appendChild(toggleBtn);


      rowBlock.appendChild(leftBlock);
      rowBlock.appendChild(centerBlock);
      rowBlock.appendChild(rightBlock);

      const customerName = document.createElement('span');
      const tableName = document.createElement('span');

      const adult = document.createElement('span');
      const child = document.createElement('span');
      const adultCnt = document.createElement('span');
      const childCnt = document.createElement('span');
    
      const menuName = document.createElement('span');
      const menuQty = document.createElement('span');

      timeInfo.innerText = dateFormat(new Date(val.timeReserved));
      statusInfo.innerText = val.status === 'reserved' ? '예약' : '착석 중';
      statusInfo.classList.add(val.status === 'reserved' ? 'txt_resv' : 'txt_seated');
      leftBlock.appendChild(timeInfo);
      leftBlock.appendChild(statusInfo);

      customerName.innerText = `${customerInfo.name} - `;
      let tableList = [];
      tableInfo.forEach(item => {
        tableList.push(item.name)
      });
      tableName.innerText = tableList.join(', ');
      subBlock.appendChild(customerName);
      subBlock.appendChild(tableName);
      centerBlock.appendChild(subBlock);

      adult.innerText = '성인 ';
      child.innerText = '아이 '; 
      adultCnt.innerText = `${customerInfo.adult} `;
      childCnt.innerText = customerInfo.child;
      subBlock2.appendChild(adult);
      subBlock2.appendChild(adultCnt);
      subBlock2.appendChild(child);
      subBlock2.appendChild(childCnt);
      centerBlock.appendChild(subBlock2);

      let menuList = []
      menuInfo.forEach(item => {
        menuList.push(`${item.name} (${item.qty})`)
      })
      menuName.innerText = menuList.join(', ')
      subBlock3.appendChild(menuName);
      centerBlock.appendChild(subBlock3);

      this.block.appendChild(rowBlock);
      }
      
    });

     // 상세 정보 시작
      const resvBlock = document.createElement('div');
      resvBlock.classList.add('wrap_top');
      const resvBlock2 = document.createElement('div');
      resvBlock2.classList.add('wrap_middle');
      const resvBlock3 = document.createElement('div');
      resvBlock3.classList.add('wrap_bottom');

      const resvTitleBox = document.createElement('div');
      resvTitleBox.classList.add('wrap_subtit');
      const resvTitle = document.createElement('span');
      resvTitle.classList.add('tit_detail');
      resvTitle.innerText = '예약 정보';
      resvTitleBox.appendChild(resvTitle);
      this.detailBlock.appendChild(resvTitleBox);

      const resvRowTop = document.createElement('div');
      resvRowTop.classList.add('list_item');
      const resvRowMiddle = document.createElement('div');
      resvRowMiddle.classList.add('list_item');
      const resvRowBottom = document.createElement('div');
      resvRowBottom.classList.add('list_item');

      const customerRowTop = document.createElement('div');
      customerRowTop.classList.add('list_item');
      const customerRowMiddle = document.createElement('div');
      customerRowMiddle.classList.add('list_item');
      const customerRowBottom = document.createElement('div');
      customerRowBottom.classList.add('list_item');
      customerRowBottom.classList.add('list_multilines');

      const requestRow = document.createElement('div');
      requestRow.classList.add('list_item');

      const resvStatusTitle = document.createElement('span');
      resvStatusTitle.classList.add('txt_tit');
      const resvTimeTitle = document.createElement('span');
      resvTimeTitle.classList.add('txt_tit');
      const registeredTimeTitle = document.createElement('span');
      registeredTimeTitle.classList.add('txt_tit');


      const closeBlock = document.createElement('div');
      closeBlock.classList.add('wrap_btn_close');
      closeBlock.classList.add('mobile');
      const btnClose = document.createElement('button');
      btnClose.classList.add('btn_close');
      btnClose.innerText = '닫기';
      closeBlock.appendChild(btnClose);
      resvTitleBox.appendChild(closeBlock);
      btnClose.addEventListener('click', function closeLayer() {
        if (isMobile) {
          const box = document.getElementById('container');
          box.classList.remove('modal-open');
          const detail = document.getElementById('detail');
          detail.classList.add('hide');
        }
        
      })

      const customerTitleBox = document.createElement('div');
      customerTitleBox.classList.add('wrap_subtit');
      const customerTitle = document.createElement('span');
      customerTitle.classList.add('tit_detail');
      customerTitle.innerText = '고객 정보';
      customerTitleBox.appendChild(customerTitle);
      
      const resvStatus = document.createElement('span');
      resvStatus.classList.add('txt_cont');
      resvStatus.id = 'resvStatus';
      resvRowTop.appendChild(resvStatusTitle);
      resvRowTop.appendChild(resvStatus);

      const resvTime = document.createElement('span');
      resvTime.classList.add('txt_cont');
      resvTime.id = 'resvTime';
      resvRowMiddle.appendChild(resvTimeTitle);
      resvRowMiddle.appendChild(resvTime);
      const registeredTime = document.createElement('span');
      registeredTime.classList.add('txt_cont');
      registeredTime.id = 'registeredTime';
      resvRowBottom.appendChild(registeredTimeTitle);
      resvRowBottom.appendChild(registeredTime);

      const customerNameTitle = document.createElement('span');
      customerNameTitle.classList.add('txt_tit');
      const customerLevelTitle = document.createElement('span');
      customerLevelTitle.classList.add('txt_tit');
      const customerMemoTitle = document.createElement('div');
      customerMemoTitle.classList.add('txt_tit', 'txt_memo');

      const customerNameDetail = document.createElement('span');
      customerNameDetail.classList.add('txt_cont');
      customerNameDetail.id = 'customerNameDetail';
      customerRowTop.appendChild(customerNameTitle);
      customerRowTop.appendChild(customerNameDetail);

      const customerLevel = document.createElement('span');
      customerLevel.classList.add('txt_cont');
      customerLevel.id = 'customerLevel';
      customerRowMiddle.appendChild(customerLevelTitle);
      customerRowMiddle.appendChild(customerLevel);

      const customerMemo = document.createElement('div');
      customerMemo.classList.add('txt_cont', 'multi_ellipsis');
      customerMemo.id = 'customerMemo';
      customerRowBottom.appendChild(customerMemoTitle);
      customerRowBottom.appendChild(customerMemo);

      const customerRequestTitle = document.createElement('span');
      customerRequestTitle.classList.add('txt_tit');
      const customerRequest = document.createElement('span');
      customerRequest.classList.add('txt_cont');
      customerRequest.id = 'customerRequest';
      requestRow.appendChild(customerRequestTitle);
      requestRow.appendChild(customerRequest);

      resvStatusTitle.innerText = '예약 상태';
      resvStatus.innerText = '';
      resvTimeTitle.innerText = '예약 시간'
      resvTime.innerText = '';
      registeredTimeTitle.innerText = '접수 시간'
      registeredTime.innerText = '';

      customerNameTitle.innerText = '고객 성명';
      customerLevelTitle.innerText = '고객 등급';
      customerMemoTitle.innerText = '고객 메모';
      customerRequestTitle.innerText = '요청 사항';

      resvBlock.appendChild(resvRowTop);
      resvBlock.appendChild(resvRowMiddle);
      resvBlock.appendChild(resvRowBottom);
      this.detailBlock.appendChild(resvBlock);

      this.detailBlock.appendChild(customerTitleBox);

      resvBlock2.appendChild(customerRowTop);
      resvBlock2.appendChild(customerRowMiddle);
      resvBlock2.appendChild(customerRowBottom);
      this.detailBlock.appendChild(resvBlock2);

      resvBlock3.appendChild(requestRow);
      this.detailBlock.appendChild(resvBlock3);

      setDetail(this.data[0]);
      
      // 상세 정보 끝
    
  }
}