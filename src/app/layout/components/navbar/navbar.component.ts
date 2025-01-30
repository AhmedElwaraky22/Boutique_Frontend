import { Component, OnDestroy, OnInit, HostBinding, HostListener, ViewEncapsulation } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'app/auth/service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { CoreMediaService } from '@core/services/media.service';
import { User } from 'app/auth/models';
import { coreConfig } from 'app/app-config';
import { Router } from '@angular/router';
import { HomeService } from 'app/components/home/home.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy {
  public horizontalMenu: boolean;
  public hiddenMenu: boolean;

  public coreConfig: any;
  public currentSkin: string;
  public prevSkin: string;

  public currentUser: User;

  public languageOptions: any;
  public navigation: any;
  public selectedLanguage: any;

  // Create Acccount 
  public createRoleForm: FormGroup;
  public createRoleFormSubmitted = false;
  public modalReference;
  public roles;
  public restrictions;
  public getRoleData;
  public isLoading = false;
  public userRole ;





  @HostBinding('class.fixed-top')
  public isFixed = false;

  @HostBinding('class.navbar-static-style-on-scroll')
  public windowScrolled = false;

  // Add .navbar-static-style-on-scroll on scroll using HostListener & HostBinding
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) &&
      this.coreConfig.layout.navbar.type == 'navbar-static-top' &&
      this.coreConfig.layout.type == 'horizontal'
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreSidebarService} _coreSidebarService
   * @param {CoreMediaService} _coreMediaService
   * @param {MediaObserver} _mediaObserver
   * @param {TranslateService} _translateService
   */
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _coreConfigService: CoreConfigService,
    private _coreMediaService: CoreMediaService,
    private _coreSidebarService: CoreSidebarService,
    private _mediaObserver: MediaObserver,
    public _translateService: TranslateService,
    private _homeServeice: HomeService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    
  ) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));

    this.languageOptions = {
      en: {
        title: 'English',
        flag: 'us'
      },
      fr: {
        title: 'French',
        flag: 'fr'
      },
      de: {
        title: 'German',
        flag: 'de'
      },
      pt: {
        title: 'Portuguese',
        flag: 'pt'
      }
    };

    // Set the private defaults
    this._unsubscribeAll = new Subject();


    // Create Account Form 
    this.createRoleForm=this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      phone: [null, [Validators.pattern(/^(01[0-9]{9}|7[0-9]{7})$/)]],
      role: ['', [Validators.required]],
      restriction_name: [[], [Validators.required]]
      })

      this.userRole = localStorage.getItem('role')
      console.log('the Role ', this.userRole);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  /**
   * Set the language
   *
   * @param language
   */
  setLanguage(language): void {
    // Set the selected language for the navbar on change
    this.selectedLanguage = language;

    // Use the selected language id for translations
    this._translateService.use(language);

    this._coreConfigService.setConfig({ app: { appLanguage: language } }, { emitEvent: true });
  }

  /**
   * Toggle Dark Skin
   */
  toggleDarkSkin() {
    // Get the current skin
    this._coreConfigService
      .getConfig()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(config => {
        this.currentSkin = config.layout.skin;
      });

    // Toggle Dark skin with prevSkin skin
    this.prevSkin = localStorage.getItem('prevSkin');

    if (this.currentSkin === 'dark') {
      this._coreConfigService.setConfig(
        { layout: { skin: this.prevSkin ? this.prevSkin : 'default' } },
        { emitEvent: true }
      );
    } else {
      localStorage.setItem('prevSkin', this.currentSkin);
      this._coreConfigService.setConfig({ layout: { skin: 'dark' } }, { emitEvent: true });
    }
  }

  /**
   * Logout method
   */
  logout() {
    this._authenticationService.logout();
    this._router.navigate(['/pages/authentication/login-v2']);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // get the currentUser details from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Subscribe to the config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
      this.horizontalMenu = config.layout.type === 'horizontal';
      this.hiddenMenu = config.layout.menu.hidden === true;
      this.currentSkin = config.layout.skin;

      // Fix: for vertical layout if default navbar fixed-top than set isFixed = true
      if (this.coreConfig.layout.type === 'vertical') {
        setTimeout(() => {
          if (this.coreConfig.layout.navbar.type === 'fixed-top') {
            this.isFixed = true;
          }
        }, 0);
      }
    });

    // Horizontal Layout Only: Add class fixed-top to navbar below large screen
    if (this.coreConfig.layout.type == 'horizontal') {
      // On every media(screen) change
      this._coreMediaService.onMediaUpdate.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
        const isFixedTop = this._mediaObserver.isActive('bs-gt-xl');
        if (isFixedTop) {
          this.isFixed = false;
        } else {
          this.isFixed = true;
        }
      });
    }

    // Set the selected language from default languageOptions
    this.selectedLanguage = _.find(this.languageOptions, {
      id: this._translateService.currentLang
    });


    this.getRole();
    this.getRestrictions();
  
    
    
  }
  // Get All Restirctions
  getRestrictions(): void {
    this._homeServeice.getAllRestrictions().subscribe({
      next: (res: any) => {
        this.restrictions = res.Restrictions
        console.log('restrictions:', this.restrictions);
      },
      error: (error) => {
        console.error('Error fetching restrictions:', error);
      }
    });
  }

  // Get Role
  getRole(){
    this._homeServeice.getAllRoles().subscribe({
      next: (res: any) => {
        this.roles = res.roles
        console.log('Roles:', this.roles);
      },
      error: (error) => {
        console.error('Error fetching restrictions:', error);
      }
    });
  }

  // Model Add Account
  ModelAddRole(modelCreateRole){
    this.createRoleFormSubmitted = false;
    this.createRoleForm.reset();
    this.modalReference = this.modalService.open(modelCreateRole, {
      backdrop: false,
      centered: true,
    });
  }
  // create Role Form Method
  createRoleFormMethod(){
      this.isLoading = true;
      this.createRoleFormSubmitted = true;
  
      if (this.createRoleForm.invalid) {
        return;
      }
  
      // Create FormData
      const formValues = this.createRoleForm.value;    
      const formData = new FormData();
      formData.append('firstName', formValues.firstName);
      formData.append('lastName', formValues.lastName);
      formData.append('email', formValues.email);
      formData.append('password', formValues.password);
      formData.append('phone', formValues.phone);
      formData.append('role', formValues.role);
       if (formValues.restriction_name && formValues.restriction_name.length > 0) {
        formValues.restriction_name.forEach((restriction, index) => {
          formData.append(`restriction_name[${index}]`, restriction);
        });
      }
  
  
      console.log('firstName', formValues.firstName);
      console.log('lastName', formValues.lastName);
      console.log('email', formValues.email);
      console.log('password', formValues.password);
      console.log('phone', formValues.phone);
      console.log('role', formValues.role);
      console.log('restriction_name', formValues.restriction_name);
    
    
      // Example: Post formData to your backend
      this._homeServeice.Register(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Account created successfully',
            confirmButtonText: 'OK'
          }).then(() => {
            // Close the modal
            this.modalReference.close();
          });
        },
        error: (error) => {
          console.log(error.message);
        
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error|| 'Failed to create account',
            confirmButtonText: 'Try Again'
          });
        }
      });
  }






  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
