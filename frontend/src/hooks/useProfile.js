import { useState, useEffect, useCallback } from 'react';
import * as profileService from '../services/profileService';
import * as referenceService from '../services/referenceService';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Справочные данные
  const [institutes, setInstitutes] = useState([]);
  const [directions, setDirections] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loadingRefs, setLoadingRefs] = useState(true);
  const [selectedInstituteId, setSelectedInstituteId] = useState('');

  // Загрузка профиля
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await profileService.getProfile();
      setProfile(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка загрузки профиля');
    } finally {
      setLoading(false);
    }
  }, []);

  // Загрузка справочников (институты)
  const fetchInstitutes = useCallback(async () => {
    try {
      const res = await referenceService.getInstitutes();
      setInstitutes(res.data);
    } catch (err) {
      console.error('Failed to load institutes', err);
    }
  }, []);

  // Загрузка направлений (если выбран институт и роль студент)
  const fetchDirections = useCallback(async (instituteId) => {
    if (!instituteId) return;
    try {
      const res = await referenceService.getDirections(instituteId);
      setDirections(res.data);
    } catch (err) {
      console.error('Failed to load directions', err);
    }
  }, []);

  // Загрузка кафедр (если выбран институт и роль преподаватель)
  const fetchDepartments = useCallback(async (instituteId) => {
    if (!instituteId) return;
    try {
      const res = await referenceService.getDepartments(instituteId);
      setDepartments(res.data);
    } catch (err) {
      console.error('Failed to load departments', err);
    }
  }, []);

  // Обновление профиля
  const updateProfile = async (data) => {
    try {
      const res = await profileService.updateProfile(data);
      setProfile(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Ошибка обновления' };
    }
  };

  // Загрузка аватара
  const uploadAvatar = async (file) => {
    try {
      const res = await profileService.uploadAvatar(file);
      setProfile(prev => ({ ...prev, avatar_path: res.data.avatar_path }));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Ошибка загрузки' };
    }
  };

  // При монтировании загружаем профиль и институты
  useEffect(() => {
    fetchProfile();
    fetchInstitutes();
  }, [fetchProfile, fetchInstitutes]);

  // Когда профиль загружен и роль студент – загружаем направления (если есть direction_id, то нужно определить институт)
  useEffect(() => {
    if (profile) {
        if (profile.institute_id) {
            setSelectedInstituteId(profile.institute_id);
            if (profile.role === 'student') {
                fetchDirections(profile.institute_id);
            } else if (profile.role === 'teacher') {
                fetchDepartments(profile.institute_id);
            }
        }
    }
  }, [profile]);

  return {
    profile,
    loading,
    error,
    institutes,
    directions,
    departments,
    loadingRefs,
    fetchDirections,
    fetchDepartments,
    updateProfile,
    uploadAvatar,
    refetchProfile: fetchProfile,
  };
};