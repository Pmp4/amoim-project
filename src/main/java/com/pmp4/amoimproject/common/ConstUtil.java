package com.pmp4.amoimproject.common;

public interface ConstUtil {

	// 인터페이스는 기본적으로, 멤버변수는 상수, 메소드는 추상메소드 이므로, 앞에 쓰는거 생략함
	//게시판 페이징 관련 상수
	public static final int RECORD_COUNT = 5;
	int BLOCKSIZE = 10;
	
	//파일 업로드 관련 상수
	String FILE_UPLOAD_TYPE = "test";		// 테스트시

//	String FILE_UPLOAD_TYPE = "deploy";	// 배포시

//	String FILE_UPLOAD_TYPE = "deploy";	// 배포시

	
	//자료실 - 파일 저장 경로
//	String TEST_FILE_PATH = "/Library/DevelopProject/Project/amoim-project/src/main/resources/static/upload/";	//for Mac
	String TEST_FILE_PATH = "C:\\files_server\\amoim\\";	//이미지 서버
	String FILE_UPLOAD_PATH = "pd_upload";
	String FILE_UPLOAD_PATH_TEST = TEST_FILE_PATH + FILE_UPLOAD_PATH;

	//관리자 페이지 - 상품 등록시 상품 이미지 저장 경로
	String IMAGE_FILE_UPLOAD_PATH = "img_upload";
	String IMAGE_FILE_UPLOAD_PATH_TEST = TEST_FILE_PATH + IMAGE_FILE_UPLOAD_PATH;

	String PROFILE_IMAGE_PATH = "profile";
	String PROFILE_IMAGE_PATH_TEST = TEST_FILE_PATH + PROFILE_IMAGE_PATH;

	//자료실 업로드인지, 상품 등록시 업로드인지 구분값
	int UPLOAD_FILE_FLAG = 1;	// 자료실 업로드
	int UPLOAD_IMAGE_FLAG = 2;	// 상품 등록시 이미지 업로드
	int UPLOAD_PROFILE = 3;
	
	//장바구니 관련 상수
	//구매금액이 3만원 미만이면 배송비 3000원
	int DELIVERY = 3000;		// 배송비
	int BUYING_PRICE = 30000;	// 기준 구매금액

	//카테고리 그룹 상수
	public static final int ORDER_DAILY=1;
	public static final int ORDER_INDIVISUAL=2;


	//주문상태 상수(정상수)
	int BEFORE_PICKUP = 1;	//수거전
	int COMPLE_PICKUP = 2;	//수거완료
	int WASHING_STEP = 3;	//세탁중
	int WATING_DELIVERY = 4;	//배송대기
	int DELIVERY_PROGRESS = 5;	//배송중
	int COMPLETION = 6;	//완료
}
