package com.pmp4.amoimproject.common;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


@Component
public class FileUploadUtil {
	private static final Logger logger
		= LoggerFactory.getLogger(FileUploadUtil.class);

	//input multipart일 경우?
	public List<Map<String, Object>> mulitiFileUpload(HttpServletRequest request,
												int uploadFlag) throws IllegalStateException, IOException {
		MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;

		List<Map<String, Object>> list = new ArrayList<>();

		List<MultipartFile> fileMap = multiRequest.getFiles("file");
		for(MultipartFile multipartFile : fileMap) {
			if(!multipartFile.isEmpty()) {
				long fileSize = multipartFile.getSize();	// 파일 크기
				String oName = multipartFile.getOriginalFilename();	// 원래 파일명

				//변경된 파일이름 구하기
				String fileName = getUniqueFileName(oName);

				//업로드할 폴더 구하기
				String uploadPath
						= getUploadPath(request, uploadFlag);

				//파일 업로드 처리
				File file = new File(uploadPath, fileName);
				multipartFile.transferTo(file);

				//업로드된 파일 정보 저장, (파일크기, 파일명2개를 VO나 Map으로 묶으면 된다)
				//[1] Map에 저장
				Map<String, Object> resultMap = new HashMap<>(); // <>뒤에는 생략가능
				resultMap.put("fileName", fileName);
				resultMap.put("fileSize", fileSize);
				resultMap.put("originalFileName", oName);

				//[2] 여러 개의 Map을 List에 저장
				list.add(resultMap);
			}
		}

		return list;
	}

	
	public List<Map<String, Object>> fileUpload(HttpServletRequest request,
			int uploadFlag) throws IllegalStateException, IOException {
		MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;
		
		// MultipartHttpServletRequest인터페이스의 부모인터페이스인 MultipartRequest의
		// 메소드중 한개를 사용하여, 파라미터 이름을 키로 파라미터에 해당하는 파일 정보를 값으로하는 map을 리턴함
		Map<String, MultipartFile> fileMap = multiRequest.getFileMap();
		
		// 업로드 파일 정보 저장할 List 선언
		List<Map<String, Object>> list = new ArrayList<>();
		
		// Iterator에 맵의 key값 받아와서 하나씩 사용
		Iterator<String> keyIter = fileMap.keySet().iterator();
		while(keyIter.hasNext()) {
			String key  = keyIter.next();
			MultipartFile tempFile = fileMap.get(key);
			//=> 업로드된 파일을 임시파일 형태로 제공 (MultipartFile객체의 존재의의)

			if(!tempFile.isEmpty()) {	// 파일이없으면, 마지막에 list==null로 리턴
				long fileSize = tempFile.getSize();	// 파일 크기
				String oName = tempFile.getOriginalFilename();	// 원래 파일명

				//변경된 파일이름 구하기
				String fileName = getUniqueFileName(oName);

				//업로드할 폴더 구하기
				String uploadPath
					= getUploadPath(request, uploadFlag);

				//파일 업로드 처리
				File file = new File(uploadPath, fileName);
				tempFile.transferTo(file);

				//업로드된 파일 정보 저장, (파일크기, 파일명2개를 VO나 Map으로 묶으면 된다)
				//[1] Map에 저장
				Map<String, Object> resultMap = new HashMap<>(); // <>뒤에는 생략가능
				resultMap.put("fileName", fileName);
				resultMap.put("fileSize", fileSize);
				resultMap.put("originalFileName", oName);

				//[2] 여러 개의 Map을 List에 저장
				list.add(resultMap);
			}//if
		}//while
		
		return list;
	}
	
	public String getUniqueFileName(String fileName) {
		//파일명이 중복될 경우 파일이름 변경하기
		//파일명에 현재시간(년원일 시분초 밀리초)을 붙여서 변경된 파일이름 구하기
		//ex) a.txt => a_20220602113820123.txt
		
		//순수 파일명만 구하기 => a
		int idx = fileName.lastIndexOf(".");
		String fileNm = fileName.substring(0, idx);		// a
		
		//확장자 구하기 => .txt
		String ext = fileName.substring(idx);		// .txt
		
		//변경된 파일이름
		Date d = new Date();
		SimpleDateFormat sdf = new  SimpleDateFormat("yyyyMMddHHmmssSSS");
		// => '년원일시분초밀리초' 포멧
		String today = sdf.format(d);
		String result = fileNm + "_" + today + ext;
		logger.info("변경된 파일명 : {}", result);
		
		return result;
	}
	
	public String getUploadPath(HttpServletRequest request, int pathFlag) {
		//업로드 경로 구하기
		//업로드경로를 설정해도 이클립스에서는 다른 경로를 사용하므로, test경로를 따로사용해야하고
		//직접배포했을시에는 getRealPath()를 사용하면 경로가 잘 잡히기 때문에,
		//테스트경로가 따로 필요함
		String path = "";
		
		if(ConstUtil.FILE_UPLOAD_TYPE.equals("test")) {	// 배포전 이클립스에서 테스트시
			if(pathFlag == ConstUtil.UPLOAD_FILE_FLAG) {	// 자료실
				path = ConstUtil.FILE_UPLOAD_PATH_TEST;
			} else if(pathFlag == ConstUtil.UPLOAD_IMAGE_FLAG) {	// 상품등록
				path = ConstUtil.IMAGE_FILE_UPLOAD_PATH_TEST;
			}
		} else {	// deploy(배포시)
			if(pathFlag == ConstUtil.UPLOAD_FILE_FLAG) {	// 자료실
				path = ConstUtil.FILE_UPLOAD_PATH;	// pds_upload
			} else if(pathFlag == ConstUtil.UPLOAD_IMAGE_FLAG) {	// 상품등록
				path = ConstUtil.IMAGE_FILE_UPLOAD_PATH;	// pd_images
			}
			
			//실제 물리적인 경로 구하기
			path = request.getSession().getServletContext().getRealPath(path);
		}
		
		logger.info("업로드 경로 : {}", path);
		
		return path;
	}
	/*
	public String getFileInfo(ReBoardVO vo, HttpServletRequest request) {
		String result = "";
		String fileName = vo.getOriginalFileName();
		
		if(fileName != null && !fileName.isEmpty()) {
			
			if(fileName.length() > 32) {
				fileName = fileName.substring(0, 33) + "...";
			}
			
			// 1024.0으로 나눠서 '실수'로 만들고, 10을 곱하고 10.0으로 나눠서
			// 소수이하 한자리수에 반올림되게 만듬
			double fileSize = Math.round((vo.getFileSize()/1024.0)*10)/10.0;	// Byte을 => KB로 변환
			
			// 사실 jsp에서 img태그를 써도 되고, 여기서 태그를 붙이고 나가도 되고 상관없음
			// 근데 여기서 붙히고 나가는게 아마도 더 편할수도??
			// 근데 범용성은 떨어질 수도???
			result = "<img src='" + request.getContextPath()
					+ "/images/file.gif'> "
					+ fileName + " (" + fileSize + " KB) "; 
		}
		
		return result;
	}
	
	*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
